import React, { useRef } from "react";
import styled from "styled-components";

import useInView from "@hooks/useInView";

const Wrapper = styled.div`
  transform: translateY(${({ animate }) => (animate ? `0px` : `70px`)});
  transition-duration: 800ms;
  transition-timing-function: ease-out;
  transition-delay: 100ms;

  p {
    transition-duration: 1600ms;
    opacity: ${({ animate }) => (animate ? 1 : 0)};
  }
`;

const Animated = ({ children }) => {
  const wrapperRef = useRef(null);
  const isShowing = useInView(wrapperRef);

  // This could take in props for changing transition/transform/opacity values
  return (
    <Wrapper ref={wrapperRef} animate={isShowing}>
      {children}
    </Wrapper>
  );
};

export default Animated;
