import styled from 'styled-components'

const Image = styled.img`
  border-radius: 18px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .2);

  ${({ width }) => `width: ${width}rem`};

  @media (min-width: 50rem) {
    ${({ widthLarge }) => `width: ${widthLarge}rem`};
  }
`

const EpisodeImage = ({ src, width, widthLarge }) => {
  return (
    <Image src={src} width={width} widthLarge={widthLarge} alt="Episode Cover" />
  )
}

export default EpisodeImage
