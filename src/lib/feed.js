import parser from 'fast-xml-parser'
import config from '../config'

const xml2jsonOpts = {
  ignoreAttributes: false,
  attrNodeName: '@_',
  attributeNamePrefix: ''
}

const slugify = (str) => str.toLowerCase()
  .replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue')
  .replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
  .replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '')

const parseEpisode = (e) => {
  const title = e.title.replace(/^#[0-9]* - /, '').replace(/^[\w\W]*: /, '')
  const guestMatch = e.title.replace(/^#[0-9]* - /, '').match(/^[\w\W]*: /)
  const guest = guestMatch.length == 1 ? guestMatch[0].replace(/: $/, '') : null
  const date = e.pubDate
  const image = e['itunes:image']['@_'].href
  const season = e['itunes:season']
  const episode = e['itunes:episode']
  const duration = e['itunes:duration']
  const slug = slugify(`s${season} e${episode} ${title}`)
  const url = e['enclosure']['@_'].url
  const descriptionHTML = e['description']
  const guid = e['guid']['#text']
  const value = {}
  const parsedRecipients = [].concat(e['podcast:value']['podcast:valueRecipient'])
  const recipients = parsedRecipients.map((r) => { return r['@_'] })

  return { title, guest, date, image, season, episode, duration, slug, url, descriptionHTML, guid, recipients }
}

export async function fetchEpisodes() {
  const res = await fetch(config.podcastFeed)
  const xml = await res.text()
  const feed = parser.parse(xml, xml2jsonOpts)

  const episodes = feed.rss.channel.item.map((item) => {
    return parseEpisode(item)
  })

  return episodes
}
