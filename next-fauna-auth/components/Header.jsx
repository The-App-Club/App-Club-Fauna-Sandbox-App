import Link from 'next/link';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import {useCookies} from 'react-cookie';
import useUser from '@/hooks/useUser';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import {cx} from '@emotion/css';

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);
  const router = useRouter();
  const {getUser} = useUser();
  const {logout} = useAuth();
  const {data: user, error} = useSWR('getUser', async () => {
    try {
      return await getUser();
    } catch (error) {
      return error;
    }
  });

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
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
        <ul className="flex items-center">
          {user.email && (
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
          )}
          {user.email && (
            <li>
              <Image
                alt={user.email}
                src={'/assets/profile.png'}
                width={60}
                height={60}
                className={`hover:cursor-pointer !rounded-full !border-2`}
                onClick={(e) => {
                  router.push('/profile');
                }}
              />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
