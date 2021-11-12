import Link from 'next/link'
import styled from 'styled-components'

import { StyledLogo, Text, Button } from '.'

const Container = styled.header`
  text-align: center;
  padding: 2rem 3rem;
  margin-bottom: 3.4375rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 50rem) {
      padding: 2rem 1.5rem;
  }

  @media (min-width: 50rem) {
    margin-bottom: 7.875rem;
  }
`

const ActionItems = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;

  @media (min-width: 50rem) {
    gap: 1.5rem;
  }
`

const DownloadButton = styled.span`
  @media (max-width: 50rem) {
    display: none;
  }
}
`

const TabLink = styled.a`
  color: var(--white);
  text-decoration: none;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

const Header = ({ children }) => {
  return (
    <Container>
      <Link href="/">
        <a>
          <StyledLogo/>
        </a>
      </Link>
      <ActionItems>
        <Link href="/blog">
          <TabLink>
            <Text fontSize={1.125} fontSizeLarge={1.25} font>Blog</Text>
          </TabLink>
        </Link>
        <Link href="/podcast">
          <TabLink>
            <Text fontSize={1.125} fontSizeLarge={1.25} font>Podcast</Text>
          </TabLink>
        </Link>
        <DownloadButton>
          <Button as="a" href={"/shareholder_letter.pdf"} download>
          Read our shareholder letter
          </Button>
        </DownloadButton>
      </ActionItems>
    </Container>
  );
};

export default Header

