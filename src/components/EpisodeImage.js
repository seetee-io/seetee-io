import styled from 'styled-components'

const Picture = styled.picture`
  display: flex;
`

const Image = styled.img`
  border-radius: 0.7rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  ${({ width }) => `width: ${width}rem`};

  @media (min-width: 50rem) {
    ${({ widthLarge }) => `width: ${widthLarge}rem`};
  }
`

const EpisodeImage = ({ episode, width, widthLarge }) => {
  return (
    <Picture>
      {episode.thumbnails?.webp && <source srcSet={episode.thumbnails.webp} type="image/webp" />}
      {episode.thumbnails?.jpg && <source srcSet={episode.thumbnails.jpg} type="image/jpeg" />}
      <Image src={episode.thumbnailFallback} width={width} widthLarge={widthLarge} alt="Episode Cover" />
    </Picture>
  )
}

export default EpisodeImage
