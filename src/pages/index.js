import { Fragment } from 'react'
import styled from 'styled-components'

import {
  Text,
  Animated,
  CallToAction,
  Quote,
  Contact,
  Bar,
} from '../components'

const Container = styled.div`
  max-width: 43rem;
  margin-left: auto;
  margin-right: auto;
`

const Tagline = styled(Text)`
  margin: 1rem 0 2.5rem;

  @media (min-width: 50rem) {
    margin: 1.5rem 0 3rem;
  }
`

const Box = styled.div`
  padding-top: ${({ pt }) => (pt ? `${pt}rem` : `2rem`)};
  padding-bottom: ${({ pb }) => (pb ? `${pb}rem` : `2rem`)};
  position: relative;

  ${({ mb }) => mb && `margin-bottom: ${mb}`};
`

const blurbs = [
  'Bitcoin is our treasury asset. Our first purchase was 1,170 BTC and our strategy is to hodl.',
  'Bitcoin can be an economic battery. We will mine to hodl in geographies where we can contribute and be supportive.',
  'Bitcoin is the heart of an ecosystem. We invest in people and companies who want to pull, push, and poke life as we know it.',
]

const IndexPage = () => {
  return (
    <Container>
      <Text as="h2" fontSize={2.5} fontSizeLarge={4.5}>
        We invest in a new financial horizon
      </Text>

      <Tagline fontWeight="var(--weightLight)">
        Seetee is a company in the Aker family. We keep our liquid investable
        assets in bitcoin and invest in exciting projects and companies
        throughout the Bitcoin ecosystem.
      </Tagline>
      <Bar />

      {blurbs.map((blurb, index) => (
        <Fragment key={index}>
          <Animated>
            <Box pt="1.5" pb="2.5">
              <Text>{blurb}</Text>
            </Box>
            <Bar />
          </Animated>
        </Fragment>
      ))}

      <Box>
        <CallToAction />
      </Box>
      <Bar />

      <Animated>
        <Box>
          <Quote img={'/kir.png'} />
        </Box>
        <Bar height="150px" />
      </Animated>

      <Animated>
        <Box>
          <Contact />
        </Box>
        <Bar />
      </Animated>
    </Container>
  )
}

export default IndexPage
