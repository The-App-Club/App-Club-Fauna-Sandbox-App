import Head from 'next/head';
import Header from '@/components/Header';
import styled from '@emotion/styled';
import {Box} from '@mui/joy';
import {css, cx} from '@emotion/css';

const Layout = ({children, className = css``}) => {
  return (
    <>
      <Head>
        <title>Next Fauna Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={className}>{children}</main>
    </>
  );
};

export default Layout;
