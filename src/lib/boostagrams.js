import fs from 'fs'

const boostagrams_dir = 'src/boostagrams/custom_records'

export function readBoostagrams() {
  return fs
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
}
