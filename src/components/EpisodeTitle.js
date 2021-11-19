import styled from 'styled-components'
import dateformat from 'dateformat'
import { Text } from '.'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
`

const MetadataContainer = styled.div`
  display: flex;
  color: var(--gray);

  font-size: 0.5rem;
  gap: 0.3rem;

  @media (min-width: 50rem) {
    font-size: 0.8rem;
    gap: 0.4rem;
  }
`

const TitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  text-align: left;

  font-size: 1rem;

  @media (min-width: 50rem) {
    font-size: 1.1rem;
  }
`

const formatEpisodeDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - (hours * 3600)) / 60)

  return `${hours}h ${minutes}m`
}

const EpisodeTitle = ({ episode }) => {
  return (
    <Container>
      <MetadataContainer>
        <Text>S{episode.season} E{episode.episode}</Text>
        <Text>&#8226;</Text>
        <Text>{formatEpisodeDuration(episode.duration)}</Text>
        <Text>&#8226;</Text>
        <Text>{dateformat(episode.date, 'dd. mmm, yyyy')}</Text>
      </MetadataContainer>
      <TitleContainer>
        <Text>{episode.guest}: {episode.title}</Text>
      </TitleContainer>
    </Container>
  )
}

export default EpisodeTitle
