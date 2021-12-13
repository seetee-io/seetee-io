// See:
// https://github.com/Einundzwanzig-Podcast/einundzwanzig.space/blob/master/tasks/fetch_feed.js

import parser from 'fast-xml-parser'
import { decode, encode } from 'html-entities'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import config from '../config'

const replacements = (str) => {
  return str && str.replace(/<\/?u>/g, '')
}

const stripHTML = (str) => {
  return (
    str &&
    encode(
      decode(
        str
          .replace(/(<([^>]+)>)/gi, '')
          .trim()
          .replace(/\n\s*/g, '\n')
      ),
      { level: 'xml' }
    )
  )
}

const xml2jsonOpts = {
  ignoreAttributes: false,
  attrNodeName: '@_',
  attributeNamePrefix: '',
}

const slugify = (str) =>
  str
    .toLowerCase()
    .replace('ä', 'ae')
    .replace('ö', 'oe')
    .replace('ü', 'ue')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')

const sanitize = (str) => {
  const window = new JSDOM('').window
  const DOMPurify = createDOMPurify(window)

  return DOMPurify.sanitize(str)
}

const styledDescriptionHTML = (descr) => {
  return descr.replace(/<p>---<\/p>/, '<hr>')
}

const parseEpisode = (e) => {
  const title = e.title.replace(/^#[0-9]* - /, '').replace(/^[\w\W]*: /, '')
  const guestMatch = e.title.replace(/^#[0-9]* - /, '').match(/^[\w\W]*: /)
  const guest = guestMatch.length == 1 ? guestMatch[0].replace(/: $/, '') : null
  const date = e.pubDate
  const image = e['itunes:image']['@_'].href
  const season = e['itunes:season']
  const episode = e['itunes:episode']
  const duration = e['itunes:duration']
  const shortcode = `S${season}E${episode}`
  const seoSlug = slugify(`${guest} ${title}`)
  const url = e['enclosure']['@_'].url
  const descriptionHTML = styledDescriptionHTML(sanitize(e['description']))
  const description = stripHTML(replacements(descriptionHTML))
  const guid = e['guid']['#text']
  const value = {}
  const parsedRecipients = [].concat(
    e['podcast:value']['podcast:valueRecipient']
  )
  const recipients = parsedRecipients.map((r) => {
    return r['@_']
  })

  return {
    title,
    guest,
    date,
    image,
    season,
    episode,
    duration,
    shortcode,
    seoSlug,
    url,
    descriptionHTML,
    description,
    guid,
    recipients,
  }
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
