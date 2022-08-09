import Link from 'next/link';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import styles from './header.module.css';
import {useCookies} from 'react-cookie';

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);
  const router = useRouter();

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

  const logout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: cookies.fauna_token,
        }),
      });
      const resultInfo = await response.json();
      if (resultInfo.httpStatus === 200) {
        removeCookie('fauna_token');
        router.push('/login');
      } else if (resultInfo.httpStatus === 500) {
        router.push('/error');
      } else {
        router.push('/error');
      }
    } catch (error) {
      router.push('/error');
    }
  };

  const renderAlreadyLogined = ({resultInfo}) => {
    const {httpStatus, email} = {...resultInfo};
    if (httpStatus === 200) {
      return (
        <>
          <li>
            <Link href="/profile">
              <a>{email}</a>
            </Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </>
      );
    }
    return null;
  };

  const renderNotLoggined = ({resultInfo}) => {
    const {httpStatus} = {...resultInfo};
    if (httpStatus === 401) {
      return (
        <>
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <a>Signup</a>
            </Link>
          </li>
        </>
      );
    }
    return null;
  };

  return (
    <div className={styles.header}>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <ul>
            {renderAlreadyLogined({resultInfo})}
            {renderNotLoggined({resultInfo})}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
