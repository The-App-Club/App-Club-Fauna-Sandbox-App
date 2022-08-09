import {useRouter} from 'next/router';
import {useCookies} from 'react-cookie';
import {useEffect} from 'react';

const useRedirect = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);
  const router = useRouter();
  const isReady = router.isReady;
  useEffect(() => {
    // https://nextjs.org/docs/api-reference/next/router
    if (isReady && Object.keys(cookies).length === 0) {
      router.push(`/`);
    }
    return () => {};
  }, [isReady]);
  return;
};

export {useRedirect};
