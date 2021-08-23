import React, { useRef, Fragment } from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import { ReactComponent as Logo } from "@assets/logo.svg";

import Layout from "@components/Layout";
import Text from "@components/Text";
import Background from "@components/BackgroundLottie";
import Button from "@components/Button";
import Animated from "@components/Animated";
import CallToAction from "@components/CallToAction";
import Quote from "@components/Quote";
import Contact from "@components/Contact";
import Footer from "@components/Footer";

const Header = styled.header`
  text-align: center;
  padding: 2rem 3rem;
  margin-bottom: 3.4375rem;

  @media (max-width: 50rem) {
    button {
      display: none;
    }
  }

  @media (min-width: 50rem) {
    margin-bottom: 7.875rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledLogo = styled(Logo)`
  color: var(--orange);
  width: 10rem;
  height: 100%;
`;

const Tagline = styled(Text)`
  margin: 1rem 0 2.5rem;

  @media (min-width: 50rem) {
    margin: 1.5rem 0 3rem;
  }
`;

const Main = styled.main`
  max-width: 22.4375rem;
  margin: 0 auto;
  text-align: center;
  padding: 0 1rem;

  @media (min-width: 50rem) {
    max-width: 43rem;
  }
`;

const Bar = styled.div`
  width: 1px;
  background: var(--orange);
  margin: 0 auto;
  height: ${({ height }) => (height ? height : "300px;")};

  @media (min-width: 50rem) {
    height: ${({ height }) => (height ? height : "500px;")};
  }
`;

const Box = styled.div`
  padding-top: ${({ pt }) => (pt ? `${pt}rem` : `2rem`)};
  padding-bottom: ${({ pb }) => (pb ? `${pb}rem` : `2rem`)};
  position: relative;

  ${({ mb }) => mb && `margin-bottom: ${mb}`};
`;

const blurbs = [
  "Bitcoin is our treasury asset. Our first purchase was 1,170 BTC and our strategy is to hodl.",
  "Bitcoin can be an economic battery. We will mine to hodl in geographies where we can contribute and be supportive.",
  "Bitcoin is the heart of an ecosystem. We invest in people and companies who want to pull, push, and poke life as we know it.",
];

const IndexPage = ({ data }) => {
  const sectionOneRef = useRef(null);

  const scrollTo = (ref) => {
    const element = ref.current;

    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const elementHeightOffset = elementRect.height / 2;
    const elementMiddle =
      absoluteElementTop - window.innerHeight / 2 + elementHeightOffset;

    window.scrollTo({ top: elementMiddle, behavior: "smooth" });
  };

  return (
    <>
      <Background />

      <Layout>
        <Header>
          <StyledLogo />
          <Button onClick={() => scrollTo(sectionOneRef)}>
            Read our shareholder letter →
          </Button>
        </Header>

        <Main>
          <Text as="h2" fontSize={2.5} fontSizeLarge={4.5}>
            We invest in a new financial horizon
          </Text>

          <Tagline fontWeight="var(--weightLight)">
            Seetee is a company in the Aker family. We keep our liquid
            investable assets in bitcoin and invest in exciting projects and
            companies throughout the Bitcoin ecosystem.
          </Tagline>
          <Bar />

          {blurbs.map((blurb, index) => (
            <Fragment key={index}>
              <Animated>
                <Box pt="1.5" pb="2.5">
                  <Text>{blurb}</Text>
                </Box>
                <Bar />
              </Animated>
            </Fragment>
          ))}

          <Box ref={sectionOneRef}>
            <CallToAction />
          </Box>
          <Bar />

          <Animated>
            <Box>
              <Quote img={data.hero.childImageSharp.fluid} />
            </Box>
            <Bar height="150px" />
          </Animated>

          <Animated>
            <Box>
              <Contact />
            </Box>
            <Bar />
          </Animated>
        </Main>
        <Footer />
      </Layout>
    </>
  );
};

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "kir.png" }) {
      childImageSharp {
        fluid(maxWidth: 1376) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
export default IndexPage;
