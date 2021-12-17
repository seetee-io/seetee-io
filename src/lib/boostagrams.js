import fs from 'fs'

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
      if (!!boostagram.time && !boostagram.ts) {
        // Add `ts` field if missing.
        const [hours, minutes, seconds] = boostagram.time.split(':')
        const secondsTotal = Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds)
        boostagram.ts = secondsTotal
      } else if (!!boostagram.ts && !boostagram.time) {
        // Add `time` field if missing.
        boostagram.time = new Date(boostagram.ts * 1000).toISOString().substr(11, 8)
      }

      return boostagram
    })
}
