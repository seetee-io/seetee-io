import React from "react";
import styled from "styled-components";
import Head from "@components/Head";

const Container = styled.div`
  color: var(--white);
  font-size: var(--fontBody);
  max-width: 90rem;
  margin: 0 auto;

  @media (min-width: 50rem) {
    font-size: var(--fontBodyLarge);
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Head />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
