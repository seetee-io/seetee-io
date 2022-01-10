import styled from 'styled-components'

import { ZapIcon } from '@primer/octicons-react'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { Date, Bar } from '../../components'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`

const ArticleContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const ArticleHeader = styled.header`
  padding-left: 2rem;
  margin-bottom: 2rem;
  text-align: left;

  h1 {
    font-weight: 700;
    font-size: 4rem;
    margin-bottom: 0.2rem;
  }

  h2 {
    font-size: 2rem;
  }
`

const MetadataContainer = styled.div`
  display: flex;
  font-size: 1.5rem;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 2rem;
  border-radius: 18px;
  background-color: var(--darkgray);
  color: var(--white);

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
  }

  h1,
  h2 {
    margin: 3.5rem 0 2rem 0;
  }
  h3,
  h4 {
    margin: 3rem 0 1.25rem 0;
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
      font-style: normal;
    }
  }

  hr {
    border: 1px dashed rgba(150, 150, 150, 1);
    margin: 2.5rem 10%;
  }

  .footnotes {
    h2 {
      font-size: 1.5rem;
      font-weight: var(--weightNormal);
    }
  }

  img {
    max-width: 50rem;
  }

  font-size: 1.4rem;
  text-align: left;
  font-weight: var(--weightLight);
  line-height: 2.2rem;

  max-width: 50rem;
  min-width: 50rem;
`

export default function Post({ postData }) {
  return (
    <>
      <PageContainer>
        <ArticleContainer>
          <ArticleHeader>
            <MetadataContainer>
              <Date dateString={postData.date} />
              <MetadataSeparator>&#8226;</MetadataSeparator>
              By&nbsp;
              {postData.linkAuthorTwitter ? (
                <a href={'https://twitter.com/' + postData.author}>{postData.author}</a>
              ) : (
                postData.author
              )}
            </MetadataContainer>
            <h1>{postData.title}</h1>
            <h2>{postData.subtitle}</h2>
          </ArticleHeader>
          <br />
          <Article>
            <div dangerouslySetInnerHTML={{ __html: postData.postHtml }} />
            {postData.footnotesHtml && (
              <>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: postData.footnotesHtml }} />
              </>
            )}
          </Article>
        </ArticleContainer>
      </PageContainer>
      <Bar />
    </>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)

  return {
    props: {
      postData,
    },
  }
}
