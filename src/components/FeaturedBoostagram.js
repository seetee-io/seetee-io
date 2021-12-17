import { useEffect } from 'react'
import styled from 'styled-components'
import Amplitude from 'amplitudejs'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  background-color: var(--darkgray);
  border-radius: 16px;
  padding: 1rem;

  max-width: 15rem;

  transition: all 0.3s ease-out;

  :hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-out;
    cursor: pointer;
  }
`

const Timestamp = styled.div`
  font-size: 0.8rem;
  text-align: left;
`

const Message = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 1rem;
  text-align: left;
  min-width: 5rem;
`

const skipTo = (seconds) => {
  const duration = Amplitude.getSongDuration()
  const targetPerc = parseFloat(seconds / duration) * 100
  Amplitude.setSongPlayedPercentage(targetPerc)
}

const FeaturedBoostagram = ({ boostagram }) => {
  const boostEmojis = ['🚀', '💬', '📣', '🧡']
  const boostEmoji = boostEmojis[Math.floor(Math.random() * boostEmojis.length)]
  return (
    <Card onClick={(e) => skipTo(boostagram.ts)}>
      <Timestamp>{`${boostEmoji} @ ${boostagram.time}`}</Timestamp>
      <Message>{boostagram.message}</Message>
    </Card>
  )
}

export default FeaturedBoostagram
