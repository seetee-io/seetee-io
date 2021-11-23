import styled from 'styled-components'

const Bar = styled.div`
  width: 1px;
  background: var(--orange);
  margin: 0 auto;
  height: ${({ height }) => (height ? height : '18.75rem')};

  @media (min-width: 50rem) {
    height: ${({ height }) => (height ? height : '31.25rem')};
  }
`

export default Bar
