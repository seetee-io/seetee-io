import React, { useRef, useEffect } from "react";
import styled from "styled-components";

import { ReactComponent as BackgroundSVG } from "@assets/bg_header.svg";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  z-index: -1;
`;

const InnerWrapper = styled.div`
  width: 100%;
`;

const StyledSVG = styled(BackgroundSVG)`
  position: relative;
  fill: rgba(255, 255, 255, 0.05);
`;

const Button = () => {
  const svgRef = useRef();

  useEffect(() => {
    const scrollRotate = () => {
      const middleSvg = svgRef.current.childNodes[0].children[1];
      middleSvg.style.transform = "rotate(" + window.pageYOffset / 32 + "deg)";
      middleSvg.style.transformOrigin = "center";
    };

    window.addEventListener("scroll", scrollRotate);

    return () => {
      window.removeEventListener("scroll", scrollRotate);
    };
  }, []);

  return (
    <Wrapper>
      <InnerWrapper ref={svgRef}>
        <StyledSVG />
      </InnerWrapper>
    </Wrapper>
  );
};

export default Button;
