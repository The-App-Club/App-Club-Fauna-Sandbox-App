import {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import {gql} from 'graphql-request';
import Layout from '../layouts/default';
import {useCookies} from 'react-cookie';

const Profile = ({}) => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);
  const [errorMessage, setErrorMessage] = useState('');

  const {data: resultInfo, error} = useSWR('/api/user', async (url) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: cookies.fauna_token,
        }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      return error;
    }
  });

  if (error) {
    setErrorMessage(error);
  }

  return (
    <Layout>
      <div>{'Profile Page'}</div>
      <p>{errorMessage}</p>
      <p>{JSON.stringify(resultInfo)}</p>

      <Link href="/">
        <a>Go To Home Page</a>
      </Link>
    </Layout>
  );
};

export default Profile;
