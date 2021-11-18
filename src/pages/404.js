import Link from "next/link";
import styled from "styled-components";

import Layout from "../components/Layout";
import Text from "../components/Text";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledText = styled(Text)`
  margin-bottom: 1rem;
`;

const NotFoundPage = () => {
  return (
    <Layout>
      <Wrapper>
        <StyledText>...we can't find the page you're looking for</StyledText>
        <Link href="/">Return home</Link>
      </Wrapper>
    </Layout>
  );
};

export default NotFoundPage;
