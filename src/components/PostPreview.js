import styled from 'styled-components'

import { Date } from '.'

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(30, 30, 30, 1);
  border-radius: 18px;

  max-width: 20rem;
  min-width: 20rem;

  @media (min-width: 50rem) {
    max-width: 40rem;
    min-width: 40rem;

    :hover {
      border: 2px solid var(--orange);

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
  flex-direction: column;
  align-items: flex-start;
  padding: 0.75rem;

  @media (min-width: 50rem) {
    padding: 1rem;
  }
`

const DateContainer = styled.div`
  font-size: 1rem;
  margin-bottom: 0.3rem;
  color: var(--darkgray);
`

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--black);
`

const Summary = styled.div`
  font-size: 1rem;
  text-align: left;
  color: var(--darkgray);
`

const PostPreview = ({ post }) => {
  return (
    <Card id="post-preview-card">
      <Content>
      <DateContainer><Date dateString={post.date} /></DateContainer>
      <Title>{post.title}</Title>
      <Summary dangerouslySetInnerHTML={{ __html: post.summary }} />
      </Content>
    </Card>
  )
}

export default PostPreview
