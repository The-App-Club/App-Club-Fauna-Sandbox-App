import Head from 'next/head';
import Header from '../components/header';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

const Layout = ({children}) => {
  return (
    <>
      <Head>
        <title>Next Fauna Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <StyledContainer>{children}</StyledContainer>
      </main>
    </>
  );
};

export default Layout;
