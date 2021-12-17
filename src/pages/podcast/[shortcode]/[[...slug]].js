import styled from 'styled-components'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { fetchEpisodes } from '../../../lib/feed'
import { Text, Bar, Footer, BreezBadge } from '../../../components'

const EpisodePlayer = dynamic(() => import('../../../components/EpisodePlayer'), { ssr: false })
const FeaturedBoostagram = dynamic(() => import('../../../components/FeaturedBoostagram'), { ssr: false })
const Boostagram = dynamic(() => import('../../../components/Boostagram'), { ssr: false })

const Container = styled.div`
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

const FeaturedBoostagramsContainer = styled.div`
  margin: 2rem 0 2rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
`

const DescriptionContainer = styled.div`
  margin: 2rem 0 2rem 0;
  display: flex;
  flex-direction: column;
`

const SectionHeading = styled.div`
  padding: 1rem 1.2rem;
  text-align: left;
  font-size: 1.4rem;
`

const DescriptionTextContainer = styled.div`
  padding: 1.5rem 1.5rem;
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem;
  text-align: justify;

  color: rgba(220, 220, 220, 1);

  border-radius: 18px;
  background-color: rgba(25, 25, 25, 1);

  a {
    color: var(--white);
    text-decoration: underline;
  }

  div {
    text-align: block;
    p:not(:last-child) {
      margin: 0 0 1rem 0;
      line-height: 1.3;
    }
    ul:last-child {
      margin-bottom: 0;
    }
  }

  hr {
    border: 1px dashed rgba(150, 150, 150, 1);
    margin: 2.5rem 10%;
  }
`

const AllBoostagramsContainer = styled.div`
  margin: 2rem 0 2rem 0;
`

const AllBoostagrams = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.5rem;
`

export default function Episode({ episode, isShortLink }) {
  const router = useRouter()

  useEffect(() => {
    if (isShortLink) {
      router.replace(`/podcast/${episode.shortcode}/${episode.seoSlug}`)
    }
  })

  const featuredBoostagrams = episode.boostagrams
    .filter((boostagram) => {
      return boostagram.message.length <= 50
    })
    .slice(0, 5)

  return (
    <>
      <Head>
        {episode.title && episode.description && (
          <>
            <title>{episode.title}</title>

            <meta name="description" content={episode.description} />

            <meta name="og:type" property="og:type" content="website" />
            <meta name="og:title" property="og:title" content={episode.guest + ': ' + episode.title} />
            <meta name="og:description" property="og:description" content={episode.description} />
            <meta name="og:image" property="og:image" content={episode.image} />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@seetee_io" />
            <meta name="twitter:image:alt" content={episode.title} />
          </>
        )}
      </Head>
      <Container>
        <EpisodeContainer>
          <EpisodePlayer episode={episode} />
        </EpisodeContainer>
        <BadgesContainer>
          <BreezBadge width={10} height="100%" episode={episode} />
        </BadgesContainer>
        <FeaturedBoostagramsContainer>
          {featuredBoostagrams.map((boostagram) => (
            <FeaturedBoostagram boostagram={boostagram} />
          ))}
        </FeaturedBoostagramsContainer>
        <Bar height="6.25rem" />
        <DescriptionContainer>
          <SectionHeading>Show Notes</SectionHeading>
          <DescriptionTextContainer>
            <div dangerouslySetInnerHTML={{ __html: episode.descriptionHTML }}></div>
          </DescriptionTextContainer>
        </DescriptionContainer>
        <Bar height="6.25rem" />
        {episode.boostagrams.length > 0 && (
          <AllBoostagramsContainer>
            <SectionHeading>Community Boosts</SectionHeading>
            <AllBoostagrams>
              {episode.boostagrams.map((boostagram) => (
                <Boostagram boostagram={boostagram} />
              ))}
            </AllBoostagrams>
          </AllBoostagramsContainer>
        )}
      </Container>
      <Bar />
    </>
  )
}

export async function getStaticPaths() {
  const episodes = await fetchEpisodes()
  const pathsShort = episodes.map((episode) => {
    return {
      params: {
        shortcode: episode.shortcode,
        slug: [],
      },
    }
  })

  const pathsLong = episodes.map((episode) => {
    return {
      params: {
        shortcode: episode.shortcode,
        slug: [episode.seoSlug],
      },
    }
  })

  const paths = pathsShort.concat(pathsLong)

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Fetching all episodes again is fine for static site generation,
  // but should be handled more efficiently if we ever switch to server side
  // rendering.
  const episodes = await fetchEpisodes()
  const filtered = episodes.filter((episode) => {
    return episode.shortcode === params.shortcode
  })

  if (filtered.length != 1) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      episode: filtered[0],
      isShortLink: !params.slug || params.slug.length == 0,
    },
  }
}
