import Graphemer from 'graphemer'

// Counts emojis etc. only once.
export function trimMessage(message, maxLength) {
  const splitter = new Graphemer()
  const graphemes = splitter.splitGraphemes(message.trim())
  const trimmedMessage = graphemes.slice(0, maxLength).join('')

  if (graphemes.length > maxLength) {
    return trimmedMessage + 'โฆ'
  }

  return trimmedMessage
}

// Counts emojis etc. only once.
export function messageLength(message) {
  const splitter = new Graphemer()
  const graphemes = splitter.splitGraphemes(message.trim())

  return graphemes.length
}

export function randomBoostEmoji() {
  const emojis = ['๐', '๐ฌ', '๐ฃ', '๐งก']

  return emojis[Math.floor(Math.random() * emojis.length)]
}
