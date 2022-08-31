const productionPath = '/assets/podcast/thumbnails'
const formats = ['jpg', 'webp']
const size = 400

export function thumbnailUrlsByFormat(episode) {
  const seasonNum = episode.season
  const episodeNum = episode.episode

  return Object.fromEntries(
    formats.map((format) => [format, `${productionPath}/s${seasonNum}e${episodeNum}_${size}x${size}.${format}`])
  )
}
