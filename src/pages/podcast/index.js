import { Fragment } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { Text, Bar, Animated, EpisodeCard, Footer } from '../../components'
import { fetchEpisodes } from '../../lib/feed'

const EpisodePlayer = dynamic(
  () => import('../../components/EpisodePlayer'),
  { ssr: false }
)

const HeadlineContainer = styled.div`
  max-width: 43rem;
  margin-left: auto;
  margin-right: auto;
`

const Tagline = styled(Text)`
  margin: 1rem 0 2.5rem;

  @media (min-width: 50rem) {
    margin: 1.5rem 0 3rem;
  }
`

const EpisodeContainer = styled.div`
  margin: 3rem 0 3rem 0;

  margin-left: auto;
  margin-right: auto;

  @media (min-width: 50rem) {
    min-width: 50rem;
    max-width: 50rem;
  }

  a {
    text-decoration: none;
    color: rgba(0,0,0,0.4);
  }
`

const EpisodesContainer = styled.div`
  padding: 3rem 0rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;

  a {
    text-decoration: none;
  }
`

export default function Podcasts({ episodes }) {
  return (
    <>
      <HeadlineContainer>
        <Text as="h2" fontSize={2.5} fontSizeLarge={4.5}>
          Closing the Loop
        </Text>

        <Tagline fontWeight="var(--weightLight)">
          Closing the Loop is a podcast about Bitcoin.
          In it, we will be speaking with the entrepreneurs, developers, and thinkers who are contributing to the evolution of this revolutionary technology.
        </Tagline>
      </HeadlineContainer>

      <Bar height="200px"/>

      <EpisodeContainer>
        <Link href={`/podcast/${episodes[0].slug}`}>
          <a>
            <EpisodePlayer episode={episodes[0]} />
          </a>
        </Link>
      </EpisodeContainer>

      <Bar height="100px"/>

      <EpisodesContainer>
        {episodes.map((episode, index) => (
          <Fragment key={index}>
            <Link href={`/podcast/${episode.slug}`}>
                <a>
                  <EpisodeCard episode={episode}/>
                </a>
            </Link>
          </Fragment>
        ))}
      </EpisodesContainer>

      <Bar />
    </>
  )
}

export async function getStaticProps() {
  const episodes = await fetchEpisodes()

  return {
    props: {
      episodes
    }
  }
}
