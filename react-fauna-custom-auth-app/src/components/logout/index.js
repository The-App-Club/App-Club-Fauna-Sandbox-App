import {logout} from '../../fauna/logout';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

const Logout = () => {
  const [cookies, removeCookie] = useCookies(['account_id']);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    try {
      const response = await logout({accountId: cookies.account_id});
      console.log(response);
      removeCookie('account_id');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleLogout}>{'Logout'}</button>;
};

export {Logout};
