import { Fragment } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import config from '../../config'

import { Text, Bar, Animated, EpisodeCard, Footer, Layout, BackgroundLottie } from '../../components'
import { fetchEpisodes } from '../../lib/feed'

const EpisodePlayer = dynamic(() => import('../../components/EpisodePlayer'), {
  ssr: false,
})

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

const EpisodePlayerContainer = styled.div`
  margin: 3rem 0 3rem 0;

  margin-left: auto;
  margin-right: auto;

  @media (min-width: 50rem) {
    min-width: 50rem;
    max-width: 50rem;
  }

  a {
    text-decoration: none;
    color: var(--gray);
  }
`

const EpisodesContainer = styled.div`
  padding: 2rem 0rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  a {
    text-decoration: none;
  }
`

const EpisodeContainer = styled.div`
  margin: 1rem;
`

export default function Podcasts({ episodes }) {
  return (
    <>
      <Head>
        {config.podcastTitle && <title>{config.podcastTitle}</title>}

        {config.podcastDescription && <meta name="description" content={config.podcastDescription} />}
      </Head>
      <HeadlineContainer>
        <Text as="h2" fontSize={2.5} fontSizeLarge={4.5}>
          Closing the Loop
        </Text>

        <Tagline fontWeight="var(--weightLight)">
          Closing the Loop is a podcast about Bitcoin. In it, we will be speaking with the entrepreneurs, developers,
          and thinkers who are contributing to the evolution of this revolutionary technology.
        </Tagline>
      </HeadlineContainer>

      <Bar height="12.5rem" />

      {episodes.length > 0 && (
        <EpisodePlayerContainer>
          <EpisodePlayer episode={episodes[0]} link={`/podcast/${episodes[0].shortcode}/${episodes[0].seoSlug}`} />
        </EpisodePlayerContainer>
      )}

      <Bar height="6.25rem" />

      {episodes.length > 1 && (
        <EpisodesContainer>
          {episodes.slice(1).map((episode, index) => (
            <Animated amount="10px" key={index}>
              <Fragment key={index}>
                <Link href={`/podcast/${episode.shortcode}/${episode.seoSlug}`}>
                  <a>
                    <EpisodeContainer>
                      <EpisodeCard episode={episode} />
                    </EpisodeContainer>
                  </a>
                </Link>
              </Fragment>
            </Animated>
          ))}
        </EpisodesContainer>
      )}

      <Bar />
    </>
  )
}

Podcasts.getLayout = function getLayout(page) {
  return (
    <>
      <BackgroundLottie />
      <Layout>{page}</Layout>
    </>
  )
}

export async function getStaticProps() {
  const episodes = await fetchEpisodes()

  return {
    props: {
      episodes,
    },
  }
}
