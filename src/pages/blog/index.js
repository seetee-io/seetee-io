import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import { loadPostMetadataByYear } from '../../lib/posts'
import config from '../../config'

import { Text, Bar, Layout, BackgroundLottie, PostPreview } from '../../components'

const HeadlineContainer = styled.div`
  max-width: 43rem;
  margin-left: auto;
  margin-right: auto;

  margin-bottom: 2.5rem;

  @media (min-width: 50rem) {
    margin-bottom: 3rem;
  }
`

const Tagline = styled(Text)`
  margin: 1rem 0 2.5rem;

  @media (min-width: 50rem) {
    margin: 1.5rem 0 3rem;
  }
`

const PostsContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  a {
    text-decoration: none;
  }
`

const YearContainer = styled.div`
  font-size: 1.5rem;
  text-align: left;
  margin-bottom: 0.5rem;

  padding-left: 0.75rem;

  @media (min-width: 50rem) {
    padding-left: 1rem;
  }
`

const PostsOfAYear = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export default function Blog({ years, postsByYear }) {
  return (
    <>
      <Head>
        {config.title && <title>{config.title}</title>}
        {config.description && <meta name="description" content={config.description} />}
      </Head>
      <HeadlineContainer>
        <Text as="h2" fontSize={2.5} fontSizeLarge={4.5}>
          Blog
        </Text>
      </HeadlineContainer>
      <Bar height="12.5rem" />
      <PostsContainer>
        {years.map((year) => (
          <div>
            <YearContainer>{year}</YearContainer>
            <PostsOfAYear>
              {postsByYear[year].map((post, index) => (
                <Link key={index} href={`/blog/${post.id}`}>
                  <a>
                    <PostPreview post={post} />
                  </a>
                </Link>
              ))}
            </PostsOfAYear>
          </div>
        ))}
      </PostsContainer>

      <Bar />
    </>
  )
}

Blog.getLayout = function getLayout(page) {
  return (
    <>
      <BackgroundLottie />
      <Layout>{page}</Layout>
    </>
  )
}

export async function getStaticProps() {
  const postsByYear = await loadPostMetadataByYear()
  const years = Object.keys(postsByYear).sort().reverse()

  return {
    props: {
      years,
      postsByYear,
    },
  }
}
