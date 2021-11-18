import { useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import dateformat from 'dateformat'
import Amplitude from 'amplitudejs'
import ShareIcon from '../../public/share.svg'
import { Text, EpisodeImage, EpisodeTitle, Value4Value, EpisodePlayerControls } from '.'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;

  a {
    text-decoration: none;
    color: rgba(0,0,0,0.4);
  }
`

const TopContainer = styled.div`
  padding: 0.7rem 0.5rem 0 0.7rem;
  background: rgba(255,255,255,.9);
  height: 1rem;
  border-radius: 18px 18px 0 0;
  display: flex;
  justify-content flex-end;
  align-items: center;
`

const StyledShareIcon = styled(ShareIcon)`
  width: 1.5rem;
  color: rgba(0,0,0,0.4);
`

const Card = styled.div`
  background: rgba(255,255,255,.9);
`

const CardContentContainer = styled.div`
  padding: 0 1.2rem 1.2rem 1.2rem;
  color: var(--black);
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (min-width: 50rem) {
    padding: 0 1.2rem 1.5rem 1.2rem;
    gap: 1.5rem;
  }
`

const EpisodeDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;

  @media (min-width: 50rem) {
    max-width: 55%;
  }
`

const Value4ValueContainer = styled.div`
  margin-top: 0.3rem;
`

const EpisodePlayer = ({ episode }) => {
  useEffect(() => {
    Amplitude.init({
      "songs": [ { "url": episode.url } ]
    })

    const element = document.getElementById('song-played-progress')

    element.addEventListener('click', (e) => {
      var offset = element.getBoundingClientRect()
      var x = e.pageX - offset.left
      var percentage = ( parseFloat( x ) / parseFloat( element.offsetWidth) ) * 100
      Amplitude.setSongPlayedPercentage(percentage)
    })

    return () => {
      Amplitude.stop()
    }
  }, [])

  return (
    <Container>
      <TopContainer>
        <Link href="https://pod.link/1578199828">
          <a>
            <StyledShareIcon />
          </a>
        </Link>
      </TopContainer>
      <Card>
        <CardContentContainer>
          <EpisodeImage src={episode.image} width={8} widthLarge={10}/>
          <EpisodeDataContainer>
            <EpisodeTitle episode={episode} />
            <Value4ValueContainer>
              <Value4Value recipients={episode.recipients}/>
            </Value4ValueContainer>
          </EpisodeDataContainer>
        </CardContentContainer>
      </Card>
      <EpisodePlayerControls episode={episode} />
    </Container>
  )
}

export default EpisodePlayer
