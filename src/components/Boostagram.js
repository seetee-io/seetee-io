import { useEffect } from 'react'
import styled from 'styled-components'
import Amplitude from 'amplitudejs'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  background-color: var(--darkgray);
  border: 2px solid var(--darkgray);
  border-radius: 16px;
  padding: 1rem;

  :hover {
    border: 2px solid var(--lightgray);
    cursor: pointer;
  }
`

const Timestamp = styled.div`
  font-size: 0.8rem;
  text-align: left;
`

const Message = styled.div`
  font-size: 1rem;
  text-align: left;
  min-width: 5rem;
`

const skipTo = (seconds) => {
  const targetSec = Math.max(seconds - 5, 0)
  const duration = Amplitude.getSongDuration()
  const targetPerc = parseFloat(targetSec / duration) * 100
  Amplitude.setSongPlayedPercentage(targetPerc)
}

const Boostagram = ({ boostagram }) => {
  const boostEmojis = ['🚀', '⚡️', '💬', '📣', '🧡']
  const boostEmoji = boostEmojis[Math.floor(Math.random() * boostEmojis.length)]
  return (
    <Card onClick={(e) => skipTo(boostagram.ts)}>
      <Timestamp>{`${boostEmoji} @ ${boostagram.time}`}</Timestamp>
      <Message>{boostagram.message}</Message>
    </Card>
  )
}

export default Boostagram
