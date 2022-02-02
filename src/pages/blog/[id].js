import styled from 'styled-components'
import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import { loadPostsMetadata, loadPost } from '../../lib/posts'
import { Date, Bar, PostImage as Image } from '../../components'
import config from '../../config'

const PageContainer = styled.div`
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
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
  align-items: stretch;
`

const ArticleHeader = styled.header`
  padding: 0 0.5rem;
  margin-bottom: 2rem;
  text-align: left;

  @media (min-width: 50rem) {
    padding: 0 2.5rem;
  }

  h1 {
    font-weight: 700;
    font-size: 3rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 1rem;
  }
`

const MetadataContainer = styled.div`
  display: flex;
  font-size: 1rem;
  color: var(--superlightgray);
  margin-bottom: 0.5rem;

  a {
    color: var(--superlightgray);
    text-decoration: underline;
  }

  @media (min-width: 50rem) {
    font-size: 1.3rem;
  }

  @media (max-width: 20rem) {
    font-size: 0.8rem;
  }
`

const MetadataSeparator = styled.span`
  margin: 0 0.3rem 0 0.3rem;

  @media (min-width: 50rem) {
    margin: 0 0.4rem 0 0.4rem;
  }
`

const CoverImageContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (min-width: 50rem) {
    min-width: 50rem;
    max-width: 50rem;
  }
`

const CoverImage = styled.img`
  width: 90%;

  border-radius: 18px;
`

const CoverImageCaption = styled.div`
  margin-top: 3rem;
  text-align: right;
  font-size: 1rem;
  color: rgba(120, 120, 120, 0.5);

  div a {
    color: rgba(120, 120, 120, 0.5);
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

  code {
    display: inline-block;
    white-space: normal;
    max-width: 100%;
    word-wrap: break-word;
  }

  .footnotes {
    max-width: 100%;
    word-wrap: break-word;

    ol {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-right: 2rem;
    }

    font-size: 0.8rem;
    line-height: 1.3rem;

    @media (min-width: 50rem) {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }

  .footnote-backref {
    padding-left: 0.5rem;
    text-decoration: none;

    @media (min-width: 50rem) {
      text-decoration: underline;
    }
  }
`

export default function Post({ id, mdxSource, frontMatter }) {
  return (
    <>
      <Head>
        {frontMatter.title && frontMatter.summary && (
          <>
            <title>{frontMatter.title}</title>
            <meta name="og:type" property="og:type" content="website" />
            <meta name="og:title" property="og:title" content={frontMatter.title} />
            {frontMatter.cover && (
              <meta
                name="og:image"
                property="og:image"
                content={config.url + '/assets/blog/' + id + '/' + frontMatter.cover}
              />
            )}
            <meta name="og:description" property="og:description" content={frontMatter.summary} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@seetee_io" />
            <meta name="twitter:image:alt" content={frontMatter.title} />
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
              <a href={`https://blockstream.info/block-height/${frontMatter.blocktime}`}>{frontMatter.blocktime}</a>
              {frontMatter.authors.map((author, index) => {
                return (
                  <span key={index}>
                    {index === 0 ? (
                      <>
                        <MetadataSeparator>&#8226;</MetadataSeparator>By &nbsp;
                      </>
                    ) : (
                      <>,&nbsp;</>
                    )}
                    {author.link ? <a href={author.link}>{author.name}</a> : author.name}
                  </span>
                )
              })}
            </MetadataContainer>
            <h1>{frontMatter.title}</h1>
            {frontMatter.subtitle && <h2>{frontMatter.subtitle}</h2>}
          </ArticleHeader>
          {frontMatter.cover && (
            <CoverImageContainer>
              <CoverImage src={'/assets/blog/' + id + '/' + frontMatter.cover} />
            </CoverImageContainer>
          )}
          <Article>
            <div className="wrapper">
              <MDXRemote {...mdxSource} components={{ Image }} />
            </div>

            {frontMatter.coverImageCaption && (
              <CoverImageCaption>
                <div dangerouslySetInnerHTML={{ __html: frontMatter.coverImageCaption }}></div>
              </CoverImageCaption>
            )}
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
      id: params.id,
      mdxSource,
      frontMatter,
    },
  }
}
