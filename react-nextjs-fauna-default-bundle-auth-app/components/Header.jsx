import Link from 'next/link';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import {useCookies} from 'react-cookie';
import useUser from '@/hooks/useUser';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import {cx} from '@emotion/css';
import {useEffect} from 'react';

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);
  const router = useRouter();
  const {getMe} = useUser();
  const {logout} = useAuth();
  const {
    data: user,
    error,
    mutate,
  } = useSWR('getMe', async () => {
    if (!cookies.fauna_token) {
      return {};
    }
    try {
      return await getMe();
    } catch (error) {
      return error;
    }
  });

  useEffect(() => {
    // logout
    mutate();
  }, [cookies]);

  const handleSignUp = async () => {
    setTimeout(() => {
      router.push('/signup');
    }, 300);
  };

  const handleLogin = async () => {
    setTimeout(() => {
      router.push('/login');
    }, 300);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setTimeout(() => {
        router.push('/');
      }, 300);
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return <p>something went wrong...</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  const renderNavContent = ({user}) => {
    if (!user.email) {
      return (
        <ul className="flex items-center gap-2">
          <li>
            <button
              onClick={handleLogin}
              className={cx(
                `px-6 py-2 bg-blue-600 text-white rounded-lg`,
                `hover:bg-blue-700`,
                `outline-none focus-visible:ring-2 focus-visible:ring-black`
              )}
            >
              ログイン
            </button>
          </li>
          <li>
            <button
              onClick={handleSignUp}
              className={cx(
                `px-6 py-2 bg-blue-600 text-white rounded-lg`,
                `hover:bg-blue-700`,
                `outline-none focus-visible:ring-2 focus-visible:ring-black`
              )}
            >
              サインアップ
            </button>
          </li>
        </ul>
      );
    }
    return (
      <ul className="flex items-center gap-2">
        <li>
          <button
            onClick={handleLogout}
            className={cx(
              `px-6 py-2 bg-blue-600 text-white rounded-lg`,
              `hover:bg-blue-700`,
              `outline-none focus-visible:ring-2 focus-visible:ring-black`
            )}
          >
            Logout
          </button>
        </li>
        <li>
          <Image
            alt={user.email}
            src={user.avatorURL}
            width={60}
            height={60}
            className={`hover:cursor-pointer !rounded-full !border-2`}
            onClick={(e) => {
              router.push('/profile1');
            }}
          />
        </li>
      </ul>
    );
  };

  return (
    <header
      className={`w-full min-h-[60px] bg-gradient-to-r from-blue-800 to-sky-500 px-2`}
    >
      <nav className="flex justify-between">
        <Image
          alt="logo"
          src={'/assets/logo.png'}
          width={60}
          height={60}
          className={`hover:cursor-pointer`}
          onClick={(e) => {
            router.push('/');
          }}
        />
        {renderNavContent({user})}
      </nav>
    </header>
  );
};

export default Header;
