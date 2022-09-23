import fs from 'fs'
import path from 'path'

const localPath = path.join(process.cwd(), 'public/assets/podcast/thumbnails')
const productionPath = '/assets/podcast/thumbnails'
const formats = ['jpg', 'webp']
const size = 400

export function thumbnailUrlsByFormat(episode) {
  const seasonNum = episode.season
  const episodeNum = episode.episode

  return Object.fromEntries(
    formats
      .map((format) => {
        try {
          const thumbnail = `s${seasonNum}e${episodeNum}_${size}x${size}.${format}`

          if (fs.existsSync(`${localPath}/${thumbnail}`)) {
            return [format, `${productionPath}/${thumbnail}`]
          }
        } catch (err) {
          return null
        }

        return null
      })
      .filter((element) => element !== null)
  )
}
