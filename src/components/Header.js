import styled from 'styled-components'
import Link from 'next/link'

import StyledLogo from './StyledLogo'
import Text from './Text'
import Button from './Button'

import styles from './Header.module.css'

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
          <a className={styles.navtab}>
            <Text fontSize={1.125} fontSizeLarge={1.25} font>Blog</Text>
          </a>
        </Link>
        <Link href="/podcast">
          <a className={styles.navtab}>
            <Text fontSize={1.125} fontSizeLarge={1.25} font>Podcast</Text>
          </a>
        </Link>
        <Button className={styles.downloadbutton} as="a" href={"/shareholder_letter.pdf"} download>
          Read our shareholder letter
        </Button>
      </ActionItems>
    </Container>
  );
};

export default Header

