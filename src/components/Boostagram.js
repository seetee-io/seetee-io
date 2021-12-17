import { useEffect } from 'react'
import styled from 'styled-components'
import Amplitude from 'amplitudejs'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  background-color: rgba(25, 25, 25, 1);
  border: 2px solid rgba(25, 25, 25, 1);
  border-radius: 16px;
  padding: 1rem;

  :hover {
    border: 2px solid rgba(35, 35, 35, 1);
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
  const duration = Amplitude.getSongDuration()
  const targetPerc = parseFloat(seconds / duration) * 100
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
