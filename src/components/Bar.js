import styled from 'styled-components'

const Bar = styled.div`
  width: 1px;
  background: var(--orange);
  margin: 0 auto;
  height: ${({ height }) => (height ? height : "300px;")};

  @media (min-width: 50rem) {
    height: ${({ height }) => (height ? height : "500px;")};
  }
`

export default Bar
