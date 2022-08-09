import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { signout } from '../../fauna/signout';
import { FaunaDBQueryManager } from '../../fauna/config';
const Header = ({ style }) => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);
  const handleLogout = async (e) => {
    try {
      await signout({
        client: new FaunaDBQueryManager({ secret: cookies.fauna_token }).client,
      });
      removeCookie('fauna_token');
      navigate('/signin', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = (e) => {
    navigate('/signin', { replace: true });
  };
  const handleSignup = (e) => {
    navigate('/signup', { replace: true });
  };
  return (
    <header>
      <ul>
        <li>
          {cookies.fauna_token ? (
            <button onClick={handleLogout}>{'logout'}</button>
          ) : (
            <button onClick={handleLogin}>{'login'}</button>
          )}
        </li>
        {!cookies.fauna_token && (
          <li>
            <button onClick={handleSignup}>{'signup'}</button>
          </li>
        )}
      </ul>
    </header>
  );
};

export { Header };
