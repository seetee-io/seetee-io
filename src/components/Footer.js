import React from 'react'
import styled from 'styled-components'

import Text from './Text'

const StyledFooter = styled.footer`
  font-size: 1rem;
  text-align: center;
  margin: 1rem 0;

  @media (min-width: 50rem) {
    margin: 1.5rem 0;
  }

  a {
    color: var(--white);
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <Text color="rgba(255,255,255,.5)">Seetee</Text>
      <Text>
        <a href="mailto:hello@seetee.io">hello@seetee.io</a>
      </Text>
    </StyledFooter>
  )
}

export default Footer
