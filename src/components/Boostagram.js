import { useEffect } from 'react'
import styled from 'styled-components'
import Amplitude from 'amplitudejs'
import Link from 'next/link'
import { randomBoostEmoji } from '../lib/utils'

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

const MetadataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  font-size: 0.8rem;
  text-align: left;
`

const AppIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`

const Message = styled.div`
  font-size: 1rem;
  text-align: left;
  min-width: 5rem;
`

const AppIcon = styled.img`
  ${({ content }) => content && `content: url(${content});`}

  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
`

const skipTo = (seconds) => {
  const targetSec = Math.max(seconds - 5, 0)
  const duration = Amplitude.getSongDuration()
  const targetPerc = parseFloat(targetSec / duration) * 100
  Amplitude.setSongPlayedPercentage(targetPerc)
}

const Boostagram = ({ boostagram }) => {
  const apps = {
    Breez: {
      icon: <AppIcon content="/assets/podcast/icon_breez.png" />,
      url: 'https://breez.technology',
    },
    Fountain: {
      icon: <AppIcon content="/assets/podcast/icon_fountain.jpg" />,
      url: 'https://fountain.fm',
    },
  }

  return (
    <Card onClick={(e) => skipTo(boostagram.ts)}>
      <MetadataContainer>
        {`${randomBoostEmoji()} @ ${boostagram.time}`}
        <AppIconContainer>
          {apps[boostagram.app_name] && (
            <Link href={apps[boostagram.app_name].url}>
              <a>{apps[boostagram.app_name].icon}</a>
            </Link>
          )}
        </AppIconContainer>
      </MetadataContainer>
      <Message>{boostagram.message}</Message>
    </Card>
  )
}

export default Boostagram
