import styled from 'styled-components'

import { Text, Bar } from '../../components'

const Tagline = styled(Text)`
  margin: 1rem 0 2.5rem;

  @media (min-width: 50rem) {
    margin: 1.5rem 0 3rem;
  }
`
export default function Blog() {
  return (
    <>
      <Text as="h2" fontSize={2.5} fontSizeLarge={4.5}>
        Seetee Blog
      </Text>

      <Tagline fontWeight="var(--weightLight)">
        Coming soon.
      </Tagline>

      <Bar />
    </>
  )
}
