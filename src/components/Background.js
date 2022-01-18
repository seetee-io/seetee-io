import React from 'react'
import styled from 'styled-components'

import BackgroundSVG from '../../public/bg_header_pod.svg'

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

const StyledSVG = styled(BackgroundSVG)`
  position: relative;
  fill: rgba(255, 255, 255, 0.05);
  width: 100%;
  margin-bottom: 4px;
`

const PodBackground = () => {
  return (
    <Wrapper>
        <StyledSVG />
    </Wrapper>
  )
}

export default PodBackground
