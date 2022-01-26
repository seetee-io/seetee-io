import styled from 'styled-components'
import { EpisodeImage, EpisodeTitle } from './'

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(30, 30, 30, 1);
  border-radius: 1rem;

  max-width: 20rem;
  min-width: 20rem;

  @media (min-width: 50rem) {
    max-width: 28rem;
    min-width: 28rem;

    :hover {
      border: 2px solid var(--orange);
    }
  }

  @media (max-width: 20rem) {
    max-width: 18rem;
    min-width: 18rem;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  color: var(--black);
  padding: 0.75rem;

  @media (min-width: 50rem) {
    padding: 1rem 1rem;
  }
`

const EpisodeDataContainer = styled.div`
  margin-left: 0.75rem;

  @media (min-width: 50rem) {
    margin-left: 1rem;
  }
`

const EpisodeCard = ({ episode }) => {
  return (
    <Card>
      <Content>
        <EpisodeImage src={episode.thumbnail} width={5} widthLarge={8} />
        <EpisodeDataContainer>
          <EpisodeTitle episode={episode} />
        </EpisodeDataContainer>
      </Content>
    </Card>
  )
}

export default EpisodeCard
