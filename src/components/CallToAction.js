import React from "react";
import styled from "styled-components";

import Text from "./Text.js";
import Button from "./Button.js";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Callout = styled(Text)`
  letter-spacing: 1px;
  @media (max-width: 50rem) {
    max-width: 10.375rem;
    margin: 0 auto;
  }
`;

const StyledText = styled(Text)`
  margin: 1rem 0 1.5rem 0;

  @media (min-width: 50rem) {
    margin-bottom: 2rem;
  }
`;

const CallToAction = () => {
  return (
    <Wrapper>
      <Callout fontSize={0.75} fontSizeLarge={1} color="var(--orange)">
        LEARN MORE ABOUT SEETEE AND OUR VISION
      </Callout>
      <StyledText fontSize={2} fontSizeLarge={3}>
        Read our shareholder letter
      </StyledText>
      <Button as="a" href={"/static/shareholder_letter-6ae7e85717c28831bf1c0eca1d632722.pdf"} download>
        Download
      </Button>
    </Wrapper>
  );
};

export default CallToAction;
