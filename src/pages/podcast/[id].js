import styled from 'styled-components'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import { fetchEpisodes } from '../../lib/feed'
import { Text, Bar, Footer, BreezBadge, StyledLogo } from '../../components'

const EpisodePlayer = dynamic(() => import('../../components/EpisodePlayer'), {
  ssr: false,
})

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

const DescriptionContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`

const DescriptionHeadingContainer = styled.div`
  padding: 1rem 1.2rem;
  background: rgba(220, 220, 220, 1);
  border-radius: 18px 18px 0 0;
  text-align: left;
  font-size: 1.4rem;
  color: var(--gray);
`

const DescriptionTextContainer = styled.div`
  padding: 1.5rem 1.5rem;
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem;
  text-align: justify;

  border-radius: 0 0 18px 18px;
  color: var(--black);
  background: rgba(255, 255, 255, 0.9);

  a {
    color: var(--black);
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
    border: 1px dashed var(--gray);
    margin: 2.5rem 20%;
  }
`

export default function Podcast({ episode }) {
  return (
    <>
      <Head>
        {episode.title && <title>{episode.title}</title>}

        {episode.description && (
          <meta name="description" content={episode.description} />
        )}
      </Head>
      <Container>
        <EpisodeContainer>
          <EpisodePlayer episode={episode} />
        </EpisodeContainer>
        <BadgesContainer>
          <BreezBadge width={10} height="100%" episode={episode} />
        </BadgesContainer>
        <Bar height="6.25rem" />
        <DescriptionContainer>
          <DescriptionHeadingContainer>Show Notes</DescriptionHeadingContainer>
          <DescriptionTextContainer>
            <div
              dangerouslySetInnerHTML={{ __html: episode.descriptionHTML }}
            ></div>
          </DescriptionTextContainer>
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
        id: episode.slug,
      },
    }
  })

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
    return episode.slug === params.id
  })

  if (filtered.length != 1) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      episode: filtered[0],
    },
  }
}
