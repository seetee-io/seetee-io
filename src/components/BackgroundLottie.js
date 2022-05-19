import React from 'react'
import styled from 'styled-components'

import Lottie from '../lib/lottie'
import animation from '../../public/lottie.json'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  z-index: -1;
`

const Background = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <Wrapper>
      <Lottie options={defaultOptions} width="100%" height="auto" />
    </Wrapper>
  )
}

export default Background
