import styled from 'styled-components'
import dynamic from 'next/dynamic'

import { fetchEpisodes } from '../../lib/feed'
import { Text, Bar, Footer, BreezBadge } from '../../components'

const EpisodePlayer = dynamic(
  () => import('../../components/EpisodePlayer'),
  { ssr: false }
)

const Container = styled.div`
  padding: 0rem 0rem 2rem 0rem;

  margin-left: auto;
  margin-right: auto;

  @media (min-width: 50rem) {
    min-width: 50rem;
    max-width: 50rem;
  }
`

const EpisodeContainer = styled.div`
  margin-bottom: 2rem;
`

const BadgesContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0rem 0 2rem 0;

  @media (min-width: 50rem) {
    display: none;
  }
`

const DescriptionContainer = styled(Text)`
  margin-top: 2rem;
  padding: 1.5rem 1.2rem 1.5rem 1.2rem;
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem;
  font-weight: var(--weightLight);
  text-align: justify;

  border-radius: 18px;
  color: var(--black);
  background: rgba(255,255,255,0.9);

  a {
    color: var(--black);
    text-decoration: underline;
  }
`

export default function Podcast({ episode }) {
  return (
    <>
    <Container>
      <EpisodeContainer>
        <EpisodePlayer episode={episode} />
      </EpisodeContainer>
      <BadgesContainer>
        <BreezBadge width={10} height="100%" episode={episode} />
      </BadgesContainer>
      <Bar height="100px"/>
      <DescriptionContainer>
        <div dangerouslySetInnerHTML={{ __html: episode.descriptionHTML }}></div>
      </DescriptionContainer>
    </Container>
    <Bar />
    </>
  )
}

export async function getStaticPaths() {
  const episodes = await fetchEpisodes()
  const paths = episodes.map((episode) => {
    return {
      params: {
        id: episode.slug
      }
    }
  })

  return {
    paths,
    fallback : false
  }
}

export async function getStaticProps({ params }) {
  const episodes = await fetchEpisodes()
  const filtered = episodes.filter((episode) => {
    return episode.slug === params.id
  })

  if (filtered.length != 1) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      episode: filtered[0]
    }
  }
}
