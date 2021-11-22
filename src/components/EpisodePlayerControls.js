import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.div`
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

const EpisodePlayerControls = ({ episode }) => {
  return (
    <Container>
      <PlayPause className="amplitude-play-pause" />
      <ProgressBar
        className="amplitude-song-played-progress"
        id="song-played-progress"
      />
      <DurationContainer>
        <CurrentDurationContainer>
          <span className="amplitude-current-hours"></span>:
          <span className="amplitude-current-minutes"></span>:
          <span className="amplitude-current-seconds"></span>
        </CurrentDurationContainer>
        &nbsp;/&nbsp;
        <TotalDurationContainer>
          <span className="amplitude-duration-hours"></span>:
          <span className="amplitude-duration-minutes"></span>:
          <span className="amplitude-duration-seconds"></span>
        </TotalDurationContainer>
      </DurationContainer>
      <DownloadLink>
        <Link href={episode.url}>
          <a>&#8595;&nbsp;Download</a>
        </Link>
      </DownloadLink>
    </Container>
  )
}

export default EpisodePlayerControls
