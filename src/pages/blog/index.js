import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import { getSortedPosts } from '../../lib/posts'
import config from '../../config'

import { Text, Bar, Layout, BackgroundLottie, PostPreview } from '../../components'

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

const PostsContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  a {
    text-decoration: none;
  }
`

export default function Blog({ postsData }) {
  return (
    <>
      <Head>
        {config.title && <title>{config.title}</title>}
        {config.description && <meta name="description" content={config.description} />}
      </Head>
      <HeadlineContainer>
        <Text as="h2" fontSize={2.5} fontSizeLarge={4.5}>
          Seetee
        </Text>

        <Tagline fontWeight="var(--weightLight)">
          Seetee buys and holds Bitcoin, while investing in ambitious projects and companies throughout the ecosystem.
        </Tagline>
      </HeadlineContainer>

      <Bar height="12.5rem" />

      <PostsContainer>
        {postsData.map((post, index) => (
          <Link key={index} href={`/blog/${post.id}`}>
            <a>
              <PostPreview post={post} />
            </a>
          </Link>
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
  const postsData = await getSortedPosts()

  return {
    props: {
      postsData,
    },
  }
}
