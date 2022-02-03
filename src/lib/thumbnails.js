import fs from 'fs'
import { ImagePool } from '@squoosh/lib'

const episodeThumbnailsDir = 'public/assets/podcast/thumbnails'
const episodeThumbnailsUrlPath = '/assets/podcast/thumbnails'

const supportedThumbnailFormats = ['jpg', 'webp']
const defaultThumbnailSize = 400

const toEpisodeThumbnailFileName = (episode, size, format) =>
  `s${episode.season}e${episode.episode}_${size}x${size}.${format}`

const toThumbnailFileNamesByFormat = (episode, size, formats) =>
  Object.fromEntries(formats.map((format) => [format, toEpisodeThumbnailFileName(episode, size, format)]))

const fileExists = async (file) =>
  fs.promises
    .access(file)
    .then(() => true)
    .catch(() => false)


const allFilesExist = async (files) => (await Promise.all(files
    .map(async (fileName) => await fileExists(`${episodeThumbnailsDir}/${fileName}`)))
  ).reduce((a, b) => a && b, true)

const fetchRawImage = async (imageUrl) => (await fetch(imageUrl)).buffer()

const createThumbnailsFromImage = async (imagePool, imageBuffer, size) => {
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

export async function downloadAllMissingEpisodeThumbnails(episodes, size = defaultThumbnailSize) {
  const imagePool = new ImagePool()

  for (const episode of episodes) {
    const thumbnailFileNamesByFormat = toThumbnailFileNamesByFormat(episode, size, supportedThumbnailFormats)

    const allThumbnailsPresent = await allFilesExist(Object.values(thumbnailFileNamesByFormat))

    if (!allThumbnailsPresent) {
      console.log(`Thumbnails for Episode ${episode.shortcode} are missing - generating..`)
      const rawImageBuffer = await fetchRawImage(episode.image)

      const rawThumbnailBuffersByFormat = await createThumbnailsFromImage(imagePool, rawImageBuffer, size)

      for (const [format, fileName] of Object.entries(thumbnailFileNamesByFormat)) {
        const file = `${episodeThumbnailsDir}/${fileName}`
        console.log(`Saving thumbnail for ${episode.shortcode}: ${file}`)

        if (!rawThumbnailBuffersByFormat[format]) {
          throw new Error(`Could not create thumbnail for format ${format}`)
        }

        await fs.promises.writeFile(file, rawThumbnailBuffersByFormat[format], 'binary')
      }
    }
  }

  await imagePool.close()
}

export function thumbnailUrlsByFormat(episode, size = defaultThumbnailSize) {
  const thumbnailFileNamesByFormat = toThumbnailFileNamesByFormat(episode, size, supportedThumbnailFormats)

  return Object.fromEntries(
    Object.entries(thumbnailFileNamesByFormat).map(([format, fileName]) => [
      format,
      `${episodeThumbnailsUrlPath}/${fileName}`,
    ])
  )
}
