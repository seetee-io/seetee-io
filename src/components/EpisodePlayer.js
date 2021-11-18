import { useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import dateformat from 'dateformat'
import Amplitude from 'amplitudejs'

import { Text, Value4Value } from '.'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;

  a {
    text-decoration: none;
    color: rgba(0,0,0,0.4);
  }
`

const Card = styled.div`
  background: rgba(255,255,255,.9);
  border-radius: 18px 18px 0 0;
`

const CardContentContainer = styled.div`
  padding: 0.8rem;
  color: var(--black);
  display: flex;
  gap: 1rem;
  align-items: center;
`

const Image = styled.img`
  width: 10rem;
  border-radius: 18px;
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

const MetadataContainer = styled.div`
  display: flex;
  gap: 0.3rem;

  color: rgba(0,0,0,0.4);
  font-size: 0.5rem;

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
  text-align: left;

  @media (min-width: 50rem) {
      font-size: 1.1rem;
  }
`

const Value4ValueContainer = styled.div`
  margin-top: 0.3rem;
`

const BottomContainer = styled.div`
  padding: 0 1rem 0 1rem;
  background-color: var(--orange);
  height: 2.5rem;
  border-radius: 0 0 18px 18px;
  display: flex;
  justify-content flex-start;
  align-items: center;

  .amplitude-play-pause.amplitude-paused {
    background: url("/play.svg");
    background-size: cover;
  }
  .amplitude-play-pause.amplitude-playing {
    background: url("/pause.svg");
    background-size: cover;
  }

  // background color
  progress.amplitude-song-played-progress {
    background-color: rgba(0,0,0,0.1);
  }
  progress[value]::-webkit-progress-bar {
    background-color: rgba(0,0,0,0.1);
  }

  // foreground color
  progress[value]::-moz-progress-bar {
    background-color: rgba(0,0,0,0.3);
  }
  progress[value]::-webkit-progress-value {
    background-color: rgba(0,0,0,0.5);
  }
`

const PlayPause = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  flex-shrink: 0;
`

const ProgressBar = styled.progress`
  margin: 0 1rem 0 1rem;
  background-color: rgba(255,111,59,0.8);
  -webkit-appearance: none;
  appearance: none;
  height: 0.4rem;
  border: none;
  flex-grow: 1;
`

const DurationContainer = styled.div`
  display: flex;
  color: rgba(0,0,0,0.4);
  font-size: 0.6rem;

  @media (min-width: 50rem) {
    font-size: 0.7rem;
  }
`

const CurrentDurationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  color: rgba(0,0,0,0.4);
  font-size: 0.6rem;
  flex-shrink: 0;
  width: 3rem;

  @media (min-width: 50rem) {
    font-size: 0.7rem;
    width: 3.5rem;
  }
`

const TotalDurationContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  color: rgba(0,0,0,0.4);
  font-size: 0.6rem;
  flex-shrink: 0;
  width: 3rem;

  @media (min-width: 50rem) {
    font-size: 0.7rem;
    width: 3.5rem;
  }
`

const DownloadLink = styled.a`
  font-size: 0.7rem;

  @media (min-width: 50rem) {
    font-size: 0.8rem;
  }
`

const formatEpisodeDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - (hours * 3600)) / 60)

  return `${hours}h ${minutes}m`
}

const EpisodePlayer = ({ episode }) => {
  useEffect(() => {
    Amplitude.init({
      "songs": [ { "url": episode.url } ]
    })

    const element = document.getElementById('song-played-progress')
    if (element == null) { return }
    element.addEventListener('click', (e) => {
      var offset = element.getBoundingClientRect()
      var x = e.pageX - offset.left
      var percentage = ( parseFloat( x ) / parseFloat( element.offsetWidth) ) * 100
      Amplitude.setSongPlayedPercentage(percentage)
    })
  }, [])

  return (
    <Container>
      <Card>
        <CardContentContainer>
          <Image src={episode.image} />
          <EpisodeDataContainer>
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
            <Value4ValueContainer>
              <Value4Value recipients={episode.recipients}/>
            </Value4ValueContainer>
          </EpisodeDataContainer>
        </CardContentContainer>
      </Card>
      <BottomContainer>
        <PlayPause className="amplitude-play-pause" />
        <ProgressBar className="amplitude-song-played-progress" id="song-played-progress"/>
        <DurationContainer>
          <CurrentDurationContainer>
            <span className="amplitude-current-hours"></span>:<span className="amplitude-current-minutes"></span>:<span className="amplitude-current-seconds"></span>
          </CurrentDurationContainer>
          &nbsp;/&nbsp;
          <TotalDurationContainer>
            <span className="amplitude-duration-hours"></span>:<span className="amplitude-duration-minutes"></span>:<span className="amplitude-duration-seconds"></span>
          </TotalDurationContainer>
        </DurationContainer>
        <DownloadLink>
          <Link href={episode.url}>
            <a>&#8595;&nbsp;Download</a>
          </Link>
        </DownloadLink>
      </BottomContainer>
    </Container>
  )
}

export default EpisodePlayer
