import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.div`
  padding: 0.5rem 0.8rem 0.5rem 0.8rem;
  background-color: var(--orange);
  height: 2rem;
  border-radius: 0 0 1rem 1rem;
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
    background-color: rgba(0, 0, 0, .1);
  }
  progress[value]::-webkit-progress-bar {
    background-color: rgba(0, 0, 0, .1);
  }

  // foreground color
  progress[value]::-moz-progress-bar {
    background-color: rgba(0, 0, 0, .15);
  }
  progress[value]::-webkit-progress-value {
    background-color: rgba(0, 0, 0, .15);
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
  background-color: rgba(255, 111, 59, 0.8);
  -webkit-appearance: none;
  appearance: none;
  height: 0.4rem;
  border: none;
  flex-grow: 1;

  @media (max-width: 50rem) {
    max-width: 30%; // fix for mobile firefox
  }

  @media (max-width: 23rem) {
    max-width: 45%; // fix for mobile firefox
  }

  @media (max-width: 22rem) {
    max-width: 40%; // fix for mobile firefox
  }

  @media (max-width: 21rem) {
    max-width: 37%; // fix for mobile firefox
  }

  @media (max-width: 20rem) {
    max-width: 33%; // fix for mobile firefox
  }
`

const DurationDownloadContainer = styled.div`
  display: flex;
  align-items: baseline;
`

const DurationContainer = styled.div`
  display: flex;
  color: var(--gray);
  font-size: 0.6rem;

  @media (min-width: 50rem) {
    font-size: 0.7rem;
  }
`

const CurrentDurationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  color: var(--gray);
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
  color: var(--gray);
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

const DownloadText = styled.span`
  @media (max-width: 23rem) {
    display: none;
  }
`

const EpisodePlayerControls = ({ episode }) => {
  return (
    <Container>
      <PlayPause className="amplitude-play-pause" />
      <ProgressBar className="amplitude-song-played-progress" id="song-played-progress" />
      <DurationDownloadContainer>
        <DurationContainer>
          <CurrentDurationContainer>
            <span className="amplitude-current-hours"></span>:<span className="amplitude-current-minutes"></span>:
            <span className="amplitude-current-seconds"></span>
          </CurrentDurationContainer>
          &nbsp;/&nbsp;
          <TotalDurationContainer>
            <span className="amplitude-duration-hours"></span>:<span className="amplitude-duration-minutes"></span>:
            <span className="amplitude-duration-seconds"></span>
          </TotalDurationContainer>
        </DurationContainer>
        <DownloadLink>
          <Link href={episode.url}>
            <a>
              &#8595;<DownloadText>&nbsp;Download</DownloadText>
            </a>
          </Link>
        </DownloadLink>
      </DurationDownloadContainer>
    </Container>
  )
}

export default EpisodePlayerControls
