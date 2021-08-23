import React, { forwardRef } from "react";
import styled from "styled-components";

import Text from "@components/Text";
import ImageWrapper from "@components/ImageWrapper";

const StyledDiv = styled.section``;

const SectionThree = forwardRef(({ img }, ref) => {
  return (
    <StyledDiv ref={ref}>
      <Text>
        We are not just going to wait for the future—we want to be part of
        building it as well.
      </Text>
      <Text>Kjell Inge Røkke Chairman of Aker &amp; ... of Seetee</Text>
      <ImageWrapper img={img} />
    </StyledDiv>
  );
});

export default SectionThree;
