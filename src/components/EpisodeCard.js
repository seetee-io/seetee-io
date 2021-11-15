import styled from 'styled-components'
import dateformat from 'dateformat'

import { Text } from './'

const Card = styled.div`
  max-width: 32rem;
  background: rgba(255,255,255,.9);
  border-radius: 18px;
  border: 2px solid rgba(30,30,30,1);

  @media (min-width: 50rem) {
    :hover {
      border: 2px solid var(--orange);
    }
  }
`

const Content = styled.div`
  padding: 1rem 1rem;
  display: flex;
  gap: 2rem;
  align-items: center;
  color: var(--black);

  @media (min-width: 50rem) {
    padding: 1.6rem 1.6rem;
  }
`

const Image = styled.img`
  width: 5rem;

  @media (min-width: 50rem) {
    width: 8rem;
  }
  border-radius: 18px;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  text-align: left;
`

const Metadata = styled.span`
  display: flex;
  gap: 0.2rem;

  color: rgba(0,0,0,0.4);
  font-size: 0.6rem;

  @media (min-width: 50rem) {
    font-size: 0.8rem;
    gap: 0.5rem;
  }
`

const EpisodeCard = ({ episode }) => {
  const getEpisodeDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds - (hours * 3600)) / 60)

    return `${hours}h ${minutes}m`
  }

  return (
    <Card>
      <Content>
        <Image src={episode.image} />
        <Details>
          <Metadata>
            <Text>S{episode.season} E{episode.episode}</Text>
            <Text>&#8226;</Text>
            <Text>{getEpisodeDuration(episode.duration)}</Text>
            <Text>&#8226;</Text>
            <Text>{dateformat(episode.date, 'dd. mmm, yyyy')}</Text>
          </Metadata>
          <Text fontSize={1} fontSizeLarge={1.3}>{episode.title} with {episode.guest}</Text>
        </Details>
      </Content>
    </Card>
  )
}

export default EpisodeCard
