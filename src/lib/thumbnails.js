import fs from 'fs'
import imagemagick from 'imagemagick'

const episode_thumbnail_dir = 'public/assets/podcast/episode'
const default_thumbnail_size = 160

const toEpisodeThumbnailFileName = (episode, size) => {
  return `s${episode.season}e${episode.episode}_${size}x${size}.jpg`
}

async function createThumbnailFromUrl(imageUrl, size = default_thumbnail_size) {
  const response = await fetch(imageUrl)
  const buffer = await response.buffer()

  return new Promise((resolve, reject) => {
    const options = {
      srcData: buffer,
      width: size,
    }
    imagemagick.resize(options, (err, stdout) => (err ? reject(err) : resolve(stdout)))
  })
}

export async function createEpisodeThumbnailIfMissing(episode, size = default_thumbnail_size) {
  const fileName = toEpisodeThumbnailFileName(episode, size)
  const file = `${episode_thumbnail_dir}/${fileName}`

  return fs.promises
    .access(file, fs.constants.F_OK)
    .catch(async () => {
      const buffer = await createThumbnailFromUrl(episode.image, size)
      return fs.promises.writeFile(file, buffer, 'binary')
    })
    .then(() => fileName)
}
