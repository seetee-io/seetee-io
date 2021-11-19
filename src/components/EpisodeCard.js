import styled from 'styled-components'
import dateformat from 'dateformat'
import { Text, EpisodeImage, EpisodeTitle } from './'

const Card = styled.div`
  background: rgba(255, 255, 255, .9);
  border: 2px solid rgba(30, 30, 30, 1);
  border-radius: 18px;

  @media (min-width: 50rem) {
    max-width: 28rem;
    min-width: 28rem;

    :hover {
      border: 2px solid var(--orange);
    }
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  color: var(--black);

  padding: 0.75rem;

  @media (min-width: 50rem) {
    gap: 1rem;
    padding: 1rem 1rem;
  }
`

const EpisodeCard = ({ episode }) => {
  return (
    <Card>
      <Content>
        <EpisodeImage src={episode.image} width={5} widthLarge={8} />
        <EpisodeTitle episode={episode} />
      </Content>
    </Card>
  )
}

export default EpisodeCard
