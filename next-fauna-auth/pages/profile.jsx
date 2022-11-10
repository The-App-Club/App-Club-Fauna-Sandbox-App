import {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import {gql} from 'graphql-request';
import Layout from '@/layouts/default';
import {useCookies} from 'react-cookie';
import useUser from '@/hooks/useUser';
import {Box, Typography} from '@mui/joy';
import {css, cx} from '@emotion/css';

const Profile = ({}) => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);
  const {getMe} = useUser();
  const {data: user, error} = useSWR('getMe', async () => {
    try {
      return await getMe();
    } catch (error) {
      return error;
    }
  });

  if (error) {
    router.push({
      pathname: '/error',
    });
    return;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <Box
        component={'section'}
        className={cx(
          css`
            margin: 0 auto;
            width: 100%;
            max-width: 400px;
            padding-top: 60px;
            min-height: calc(100vh - 60px);
            @media (max-width: 768px) {
              max-width: 100%;
            }
          `
        )}
      >
        <Typography component="h2" className="!text-2xl font-bold">
          プロフィール
        </Typography>
        <Box>
          <Typography>メールアドレス</Typography>
          <Typography>{user.email}</Typography>
        </Box>
        <Link href="/">
          <a>Go To Home Page</a>
        </Link>
      </Box>
    </Layout>
  );
};

export default Profile;
