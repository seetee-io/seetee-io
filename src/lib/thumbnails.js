import fs from 'fs'
import { ImagePool } from '@squoosh/lib'

const episode_thumbnail_dir = 'public/assets/podcast/thumbnails'
const episode_thumbnails_url_path = '/assets/podcast/thumbnails'

const supported_thumbnail_formats = ['jpg', 'webp']
const default_size = 160

const toEpisodeThumbnailFileName = (episode, size, format) =>
  `s${episode.season}e${episode.episode}_${size}x${size}.${format}`

const toThumbnailFileNamesByFormat = (episode, size, formats) =>
  Object.fromEntries(formats.map((format) => [format, toEpisodeThumbnailFileName(episode, size, format)]))

const fileExists = async (file) =>
  fs.promises
    .access(file)
    .then(() => true)
    .catch(() => false)

const fetchRawImage = async (imageUrl) => (await fetch(imageUrl)).buffer()

const createThumbnailsFromImageBufferPool = async (imagePool, imageBuffer, size) => {
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
  })

  return {
    jpg: (await image.encodedWith.mozjpeg).binary,
    webp: (await image.encodedWith.webp).binary,
  }
}

export async function downloadAllMissingEpisodeThumbnails(episodes, size = default_size) {
  const imagePool = new ImagePool()

  for (const episode of episodes) {
    const thumbnailFileNamesByFormat = toThumbnailFileNamesByFormat(episode, size, supported_thumbnail_formats)

    const allThumbnailsPresent = await Object.values(thumbnailFileNamesByFormat)
      .map(async (fileName) => await fileExists(`${episode_thumbnail_dir}/${fileName}`))
      .reduce((a, b) => a && b, true)

    if (!allThumbnailsPresent) {
      console.log(`Thumbnails for Episode ${episode.shortcode} are missing - generating..`)
      const rawImageBuffer = await fetchRawImage(episode.image)

      const rawThumbnailBuffers = await createThumbnailsFromImageBufferPool(imagePool, rawImageBuffer, size)

      for (const [format, fileName] of Object.entries(thumbnailFileNamesByFormat)) {
        const file = `${episode_thumbnail_dir}/${fileName}`
        console.log(`Saving thumbnail for ${episode.shortcode}: ${file}`)

        if (!rawThumbnailBuffers[format]) {
          throw new Error(`Could not create thumbnail for format ${format}`)
        }

        await fs.promises.writeFile(file, rawThumbnailBuffers[format], 'binary')
      }
    }
  }

  await imagePool.close()
}

export function thumbnailUrlsByFormat(episode, size = default_size) {
  const thumbnailFileNamesByFormat = toThumbnailFileNamesByFormat(episode, size, supported_thumbnail_formats)

  return Object.fromEntries(
    Object.entries(thumbnailFileNamesByFormat).map(([format, fileName]) => [
      format,
      `${episode_thumbnails_url_path}/${fileName}`,
    ])
  )
}
