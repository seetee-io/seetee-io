import styled from 'styled-components'

import { Date } from '.'

const Card = styled.div`
  background: var(--darkgray);
  border: 2px solid rgba(30, 30, 30, 1);
  border-radius: 18px;

  max-width: 20rem;
  min-width: 20rem;

  @media (min-width: 50rem) {
    max-width: 40rem;
    min-width: 40rem;

    :hover {
      border: 2px solid var(--lightgray);

      h1 {
        color: var(--orange);
      }
    }
  }

  @media (max-width: 20rem) {
    max-width: 18rem;
    min-width: 18rem;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  color: var(--black);
  padding: 1rem;

  @media (min-width: 50rem) {
    padding: 1rem 1rem;
  }
`

const Thumbnail = styled.img`
  border-radius: 18px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  display: none;

  @media (min-width: 50rem) {
    display: initial;
    width: 8rem;
    object-fit: contain;
  }
`

const TextContainer = styled.div`
  @media (min-width: 50rem) {
    margin-left: 1rem;
  }
`

const MetadataContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--superlightgray);

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

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: left;
  margin-bottom: 1rem;
  color: var(--white);
`

const Summary = styled.div`
  font-size: 1rem;
  text-align: left;
  color: var(--white);
`

const PostPreview = ({ post }) => {
  return (
    <Card id="post-preview-card">
      <Content>
        <Thumbnail src={'/assets/blog/' + post.id + '/' + post.thumbnail} alt={post.title}></Thumbnail>
        <TextContainer>
          <MetadataContainer>
            <Date dateString={post.date} />
            <MetadataSeparator>&#8226;</MetadataSeparator>
            <a href={`https://blockstream.info/block-height/${post.blocktime}`}>{post.blocktime}</a>
            <MetadataSeparator>&#8226;</MetadataSeparator>
            By&nbsp;{post.author}
          </MetadataContainer>
          <Title>{post.title}</Title>
          <Summary dangerouslySetInnerHTML={{ __html: post.summary }} />
        </TextContainer>
      </Content>
    </Card>
  )
}

export default PostPreview
