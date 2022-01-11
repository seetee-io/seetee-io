import styled from 'styled-components'
import Head from 'next/head'

import { loadPostsMetadata, loadPost } from '../../lib/posts'
import { Date, Bar, PostImage as Image } from '../../components'
import { MDXRemote } from 'next-mdx-remote'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;

  margin-left: auto;
  margin-right: auto;

  @media (min-width: 50rem) {
    min-width: 50rem;
    max-width: 50rem;
  }
`

const ArticleContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const ArticleHeader = styled.header`
  padding-left: 0.5rem;
  margin-bottom: 2rem;
  text-align: left;

  @media (min-width: 50rem) {
    padding-left: 2.5rem;
  }

  h1 {
    font-weight: 700;
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem;
  }
`

const MetadataContainer = styled.div`
  display: flex;
  font-size: 1.3rem;
  color: var(--superlightgray);
  margin-bottom: 0.5rem;

  a {
    color: var(--superlightgray);
    text-decoration: underline;
  }
`

const MetadataSeparator = styled.span`
  margin: 0 0.3rem 0 0.3rem;

  @media (min-width: 50rem) {
    margin: 0 0.4rem 0 0.4rem;
  }
`

const Article = styled.div`
  padding: 0 0.5rem;
  border-radius: 18px;
  color: var(--white);
  font-size: 1.3rem;
  text-align: left;
  font-weight: var(--weightLight);
  line-height: 2rem;

  @media (min-width: 50rem) {
    background-color: var(--darkgray);
    padding: 0.5rem 2.5rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    a {
      text-decoration: none;
      font-style: normal;
    }
    a:hover {
      text-decoration: underline;
    }
  }

  h1,
  h2 {
    margin: 3.5rem 0 2rem 0;
  }
  h3,
  h4,
  h5,
  h6 {
    margin: 3rem 0 0 0;
  }

  p {
    margin: 1.5rem 0;
  }

  a {
    color: var(--white);
    text-decoration: underline;
    font-style: italic;
  }

  sup {
    padding-right: 0.1rem;
    a {
      text-decoration: none;
      font-style: italic;
    }
    a:hover {
      text-decoration: underline;
    }
  }

  hr {
    border: 1px dashed rgba(150, 150, 150, 1);
    margin: 2.5rem 10%;
  }

  img {
    max-width: 50rem;
  }

  .footnote-backref {
    padding-left: 0.5rem;
    text-decoration: none;

    @media (min-width: 50rem) {
      text-decoration: underline;
    }
  }
`

export default function Post({ mdxSource, frontMatter }) {
  console.log(frontMatter.title)
  return (
    <>
      <Head>
        {frontMatter.title && frontMatter.summary && (
          <>
            <title>{frontMatter.title}</title>
            <meta name="og:type" property="og:type" content="website" />
            <meta name="og:title" property="og:title" content={frontMatter.title} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@seetee_io" />
            <meta name="twitter:image:alt" content={frontMatter.title} />
            <meta name="og:description" property="og:description" content={frontMatter.summary} />
            <meta name="description" content={frontMatter.summary} />
          </>
        )}
      </Head>
      <PageContainer>
        <ArticleContainer>
          <ArticleHeader>
            <MetadataContainer>
              <Date dateString={frontMatter.date} />
              <MetadataSeparator>&#8226;</MetadataSeparator>
              By&nbsp;
              {frontMatter.linkAuthorTwitter ? (
                <a href={'https://twitter.com/' + frontMatter.author}>{frontMatter.author}</a>
              ) : (
                frontMatter.author
              )}
            </MetadataContainer>
            <h1>{frontMatter.title}</h1>
            <h2>{frontMatter.subtitle}</h2>
          </ArticleHeader>
          <Article>
            <div className="wrapper">
              <MDXRemote {...mdxSource} components={{ Image }} />
            </div>
          </Article>
        </ArticleContainer>
      </PageContainer>
      <Bar />
    </>
  )
}

export async function getStaticPaths() {
  const posts = loadPostsMetadata()

  const paths = posts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { mdxSource, frontMatter } = await loadPost(params.id)

  return {
    props: {
      mdxSource,
      frontMatter,
    },
  }
}
