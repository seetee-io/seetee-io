import fs from 'fs'
import imagemagick from 'imagemagick'

const episode_thumbnail_dir = 'public/assets/podcast/episode'
const default_size = 320
const default_format = 'webp'

const toEpisodeThumbnailFileName = (episode, size, format) => {
  return `s${episode.season}e${episode.episode}_${size}x${size}.${format}`
}

const createThumbnailFromUrl = async (imageUrl, size, format) => {
  const response = await fetch(imageUrl)
  const buffer = await response.buffer()

  return new Promise((resolve, reject) => {
    const options = {
      srcData: buffer,
      width: size,
      format: format,
    }
    imagemagick.resize(options, (err, stdout) => (err ? reject(err) : resolve(stdout)))
  })
}

export async function createEpisodeThumbnailIfMissing(episode, size = default_size, format = default_format) {
  const fileName = toEpisodeThumbnailFileName(episode, size, format)
  const file = `${episode_thumbnail_dir}/${fileName}`

  return fs.promises
    .access(file, fs.constants.F_OK)
    .catch(async () => {
      const buffer = await createThumbnailFromUrl(episode.image, size, format)
      return fs.promises.writeFile(file, buffer, 'binary')
    })
    .then(() => fileName)
}
