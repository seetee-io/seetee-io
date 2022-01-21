import Graphemer from 'graphemer'

// Counts emojis etc. only once.
export function trimMessage(message, maxLength) {
  const splitter = new Graphemer()
  const graphemes = splitter.splitGraphemes(message.trim())
  const trimmedMessage = graphemes.slice(0, maxLength).join('')

  if (graphemes.length > maxLength) {
    return trimmedMessage + '…'
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
  const emojis = ['🚀', '💬', '📣', '🧡']

  return emojis[Math.floor(Math.random() * emojis.length)]
}
