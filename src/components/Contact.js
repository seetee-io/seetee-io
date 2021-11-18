import React from "react";
import styled from "styled-components";

import Text from "./Text";
import Button from "./Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledText = styled(Text)`
  margin-bottom: 1.5rem;

  @media (min-width: 50rem) {
    margin-bottom: 2rem;
  }
`;

const Contact = () => {
  return (
    <Wrapper>
      <StyledText>
        We encourage entrepreneurs with knowledge about, experience with, and
        big ideas and ambitions for Bitcoin to get in touch.
      </StyledText>
      <Button as="a" href="mailto:hello@seetee.io">
        Get in touch
      </Button>
    </Wrapper>
  );
};

export default Contact;
