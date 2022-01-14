import Link from 'next/link'
import styled from 'styled-components'
import dateformat from 'dateformat'
import { Text } from '.'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const MetadataContainer = styled.div`
  display: flex;
  align-items: center;
  color: var(--gray);
  text-align: left;
  font-size: 0.7rem;
  margin: 0 0 0.1rem 0;

  @media (min-width: 50rem) {
    font-size: 0.8rem;
  }
`

const MetadataSeparator = styled.span`
  margin: 0 0.3rem 0 0.3rem;

  @media (min-width: 50rem) {
    margin: 0 0.4rem 0 0.4rem;
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

  a {
    color: var(--black) !important;
  }
`

const formatEpisodeDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - hours * 3600) / 60)

  return `${hours}h ${minutes}m`
}

const EpisodeTitle = ({ episode }) => {
  return (
    <Container>
      <MetadataContainer>
        <Text>{episode.shortcode.split(/(?=[E])/).join(' ')}</Text>
        <MetadataSeparator>&#8226;</MetadataSeparator>
        <Text>{formatEpisodeDuration(episode.duration)}</Text>
        <MetadataSeparator>&#8226;</MetadataSeparator>
        <Text>{dateformat(episode.date, 'dd. mmm, yyyy')}</Text>
      </MetadataContainer>
      <TitleContainer>
        <Link href="https://pod.link/1578199828">
          <a>
            {episode.guest}: {episode.title}
          </a>
        </Link>
      </TitleContainer>
    </Container>
  )
}

export default EpisodeTitle
