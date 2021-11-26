import { useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import dateformat from 'dateformat'
import Amplitude from 'amplitudejs'
import ShareIcon from '../../public/share.svg'
import {
  Text,
  EpisodeImage,
  EpisodeTitle,
  Value4Value,
  EpisodePlayerControls,
} from '.'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: var(--gray);
  }
`

const TopContainer = styled.div`
  padding: 0.7rem 0.5rem 0 0.7rem;
  background: rgba(255, 255, 255, .9);
  height: 1rem;
  border-radius: 18px 18px 0 0;
  display: flex;
  justify-content flex-end;
  align-items: center;
`

const StyledShareIcon = styled(ShareIcon)`
  width: 1.5rem;
  color: var(--gray);
`

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
`

const CardContentContainer = styled.div`
  padding: 0 1.2rem 1.2rem 1.2rem;
  color: var(--black);
  display: flex;
  align-items: center;

  @media (min-width: 50rem) {
    padding: 0 1.2rem 1.5rem 1.2rem;
  }
`

const EpisodeDataContainer = styled.div`
  margin-left: 1rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 50rem) {
    margin-left: 1.5rem;
    max-width: 55%;
  }
`

const Value4ValueContainer = styled.div`
  margin-top: 0.5rem;
`

const renderCardContainer = (episode) => {
  return (
    <CardContentContainer>
      <EpisodeImage src={episode.image} width={8} widthLarge={10} />
      <EpisodeDataContainer>
        <EpisodeTitle episode={episode} />
        <Value4ValueContainer>
          <Value4Value recipients={episode.recipients} />
        </Value4ValueContainer>
      </EpisodeDataContainer>
    </CardContentContainer>
  )
}

const renderCard = (episode, link) => {
  if (link) {
    return (
      <Card style={{ cursor: 'pointer' }}>
        <Link href={link}>{renderCardContainer(episode)}</Link>
      </Card>
    )
  }

  return <Card>{renderCardContainer(episode)}</Card>
}

const EpisodePlayer = ({ episode, link }) => {
  useEffect(() => {
    Amplitude.init({
      songs: [{ url: episode.url }],
    })

    const element = document.getElementById('song-played-progress')
    element.addEventListener('click', (e) => {
      var offset = element.getBoundingClientRect()
      var x = e.pageX - offset.left
      var percentage = (parseFloat(x) / parseFloat(element.offsetWidth)) * 100
      Amplitude.setSongPlayedPercentage(percentage)
    })

    return () => {
      Amplitude.stop()
    }
  }, [episode.url])

  return (
    <Container>
      <TopContainer>
        <Link href="https://pod.link/1578199828">
          <a>
            <StyledShareIcon />
          </a>
        </Link>
      </TopContainer>
      {renderCard(episode, link)}
      <EpisodePlayerControls episode={episode} />
    </Container>
  )
}

export default EpisodePlayer
