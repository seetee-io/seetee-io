import React, { forwardRef } from 'react'
import styled from 'styled-components'

import Text from './Text.js'

const Wrapper = styled.section`
  font-weight: var(--weightLight);
`

const ImageWrapper = styled.div`
  max-width: 11.75rem;
  margin: 0 auto;

  > img {
    border-radius: 50%;
  }

  @media (min-width: 50rem) {
    max-width: 13.75rem;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
`

const Blockquote = styled.blockquote`
  margin: 1.5rem 0 1rem 0;
  font-size: 1.5rem;

  @media (min-width: 50rem) {
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }
`

const StyledText = styled(Text)`
  line-height: 130%;
`

const Quote = forwardRef(({ img }, ref) => {
  return (
    <Wrapper ref={ref}>
      <ImageWrapper>
        {img && <Image src={img} alt="Kjell Inge Røkke" />}
      </ImageWrapper>

      <Blockquote>
        &quot;We are not going to wait for the future - we want to join in
        building it as well! I encourage entrepreneurs to reach out to Seetee.
        The bigger the dream, the more we listen.&quot;
      </Blockquote>
      <StyledText fontSize={1} fontSizeLarge={1.5} color="rgba(255,255,255,.8)">
        Kjell Inge Røkke <br /> Chairman of Aker &amp; Founder of Seetee
      </StyledText>
    </Wrapper>
  )
})

Quote.displayName = 'Quote'

export default Quote
