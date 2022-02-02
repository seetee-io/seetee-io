import fs from 'fs'
import { ImagePool } from '@squoosh/lib'

const episode_thumbnail_dir = 'public/assets/podcast/thumbnails'
const episode_thumbnails_url_path = '/assets/podcast/thumbnails'
const default_size = 320

const toEpisodeThumbnailFileName = (episode, size, format) =>
  `s${episode.season}e${episode.episode}_${size}x${size}.${format}`

const fileExists = async (file) =>
  fs.promises
    .access(file)
    .then(() => true)
    .catch(() => false)

const createThumbnailsFromImageBuffer = async (imageBuffer, size) => {
  const imagePool = new ImagePool()
  const image = imagePool.ingestImage(imageBuffer)

  await image.decoded
  await image.preprocess({
    resize: {
      enabled: true,
      width: size,
    },
  })

  await image.encode({
    webp: {},
    mozjpeg: {},
    jxl: {
      quality: 90,
    },
  })

  await imagePool.close()

  return {
    jpg: (await image.encodedWith.mozjpeg).binary,
    webp: (await image.encodedWith.webp).binary,
  }
}

const createThumbnailsFromUrl = async (imageUrl, size) => {
  const response = await fetch(imageUrl)
  const buffer = await response.buffer()
  return await createThumbnailsFromImageBuffer(buffer, size)
}

export async function createEpisodeThumbnailsIfMissing(episode, size = default_size) {
  const formats = ['jpg', 'webp']

  const thumbnailFileNamesByFormat = Object.fromEntries(
    formats.map((format) => [format, toEpisodeThumbnailFileName(episode, size, format)])
  )

  const allThumbnailsPresent = await Object.values(thumbnailFileNamesByFormat)
    .map(async (fileName) => await fileExists(`${episode_thumbnail_dir}/${fileName}`))
    .reduce((a, b) => a && b, true)

  if (!allThumbnailsPresent) {
    console.log(`Thumbnails for Episode ${episode.shortcode} are missing - generating..`)

    const rawThumbnailBuffers = await createThumbnailsFromUrl(episode.image, size)

    for (const [format, fileName] of Object.entries(thumbnailFileNamesByFormat)) {
      const file = `${episode_thumbnail_dir}/${fileName}`
      console.log(`Saving thumbnail for ${episode.shortcode}: ${file}`)

      if (!rawThumbnailBuffers[format]) {
        throw new Error(`Could not create thumbnail for format ${format}`)
      }

      await fs.promises.writeFile(file, rawThumbnailBuffers[format], 'binary')
    }
  }

  return Object.fromEntries(
    Object.entries(thumbnailFileNamesByFormat).map(([format, fileName]) => [
      format,
      `${episode_thumbnails_url_path}/${fileName}`,
    ])
  )
}
