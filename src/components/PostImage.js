import styled from 'styled-components'

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: var(--superlightgray);

  @media (min-width: 50rem) {
    padding: 2rem;
  }
`

const Image = styled.img`
  width: 100%;
  object-fit: contain;
`

const PostImage = ({ postId, name, caption }) => {
  return (
    <Container>
      <Image src={'/assets/blog/' + postId + '/' + name} alt={caption} />
      {caption}
    </Container>
  )
}

export default PostImage
