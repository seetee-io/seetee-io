import React from "react";
import styled from "styled-components";

const Element = styled.p`
  ${({ color }) => color && `color: ${color};`}
  ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight};`}

  ${({ fontSize }) => `font-size: ${fontSize ? `${fontSize}rem;` : "inherit;"}`}

  @media (min-width: 50rem) {
    ${({ fontSizeLarge }) =>
      `font-size: ${fontSizeLarge ? `${fontSizeLarge}rem;` : "inherit;"}`}
  }
`;

const Text = ({
  as,
  children,
  fontSize,
  fontSizeLarge,
  fontWeight,
  color,
  className,
}) => {
  return (
    <Element
      as={as}
      fontSize={fontSize}
      fontSizeLarge={fontSizeLarge}
      fontWeight={fontWeight}
      color={color}
      className={className}
    >
      {children}
    </Element>
  );
};

export default Text;
