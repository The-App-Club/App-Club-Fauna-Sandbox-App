import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useCookies} from 'react-cookie';

const useRedirect = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);

  useEffect(() => {
    if (!cookies.fauna_token) {
      // router.push('/login');
    }
  }, [cookies]);

  return <p>Redirecting...</p>;
};

const Middleware = ({router, children}) => {
  useRedirect();
  return children;
};

export default Middleware;
