import styled from 'styled-components'

import MetaHead from './MetaHead'
import Header from './Header'
import Footer from './Footer'
import Background from '../components/BackgroundLottie'

const Container = styled.div`
  color: var(--white);
  font-size: var(--fontBody);
  max-width: 90rem;
  margin: 0 auto;

  @media (min-width: 50rem) {
    font-size: var(--fontBodyLarge);
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

const Layout = ({ children }) => {
  return (
    <>
      <MetaHead />
      <Background />
      <Container>
        <Header />
        <Main>
          {children}
        </Main>
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
