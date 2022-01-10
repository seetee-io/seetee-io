import styled from 'styled-components'

const Container = styled.div`
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: var(--superlightgray);

  img {
    width: 100%;
  }
`

const PostImage = ({ postId, name, caption }) => {
  return (
    <Container>
      <img src={'/assets/blog/' + postId + '/' + name} />
      {caption}
    </Container>
  )
}

export default PostImage
