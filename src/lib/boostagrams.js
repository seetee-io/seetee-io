import fs from 'fs'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import { trimMessage } from './utils'

const boostagrams_dir = 'src/boostagrams/custom_records'

export function readBoostagrams() {
  const boostagrams = fs
    .readdirSync(boostagrams_dir)
    .filter((paths) => paths.match(/custom_record_.*\.json/) !== null)
    .map((path) => boostagrams_dir + '/' + path)
    .map((path) => {
      try {
        return JSON.parse(fs.readFileSync(path))
      } catch (err) {
        console.log(`Couldn't parse ${path}. Skipping.`)
        return null
      }
    })
    .filter((json) => json !== null)

  return filterAndFix(boostagrams)
}

function filterAndFix(boostagrams) {
  return boostagrams
    .filter((boostagram) => {
      if (!boostagram.podcast && !boostagram.feedID && !boostagram.url) {
        // Todo: Add `podcast:guid` once the podcast feed supports it.
        return false
      }

      if (!!boostagram.podcast) return boostagram.podcast === 'Closing the Loop'
      if (!!boostagram.feedID) return boostagram.feedID === '4058673'
      if (!!boostagram.url) return boostagram.url === 'https://closing-the-loop.github.io/feed.xml'

      if (!!boostagram.message) return boostagram.message.length > 0
      else return false
    })
    .map((boostagram) => {
      const maxLength = 280
      boostagram.message = trimMessage(sanitize(boostagram.message), maxLength)

      return boostagram
    })
    .map((boostagram) => {
      if (!!boostagram.time && !boostagram.ts) {
        boostagram.time = sanitize(boostagram.time.trim())
        // Add `ts` field if missing.
        const [hours, minutes, seconds] = boostagram.time.split(':')
        const secondsTotal = Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds)
        boostagram.ts = secondsTotal
      } else if (!!boostagram.ts && !boostagram.time) {
        boostagram.ts = sanitize(boostagram.ts.trim())
        // Add `time` field if missing.
        boostagram.time = new Date(boostagram.ts * 1000).toISOString().substring(11, 19)
      }

      return boostagram
    })
}

const sanitize = (str) => {
  const window = new JSDOM('').window
  const DOMPurify = createDOMPurify(window)

  return DOMPurify.sanitize(str)
}
