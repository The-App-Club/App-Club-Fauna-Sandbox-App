import {useCookies} from 'react-cookie';

const useUser = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);
  const getMe = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`/api/me`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: cookies.fauna_token,
          }),
        });
        const json = await response.json();
        resolve(json);
      } catch (error) {
        reject(error);
      }
    });
  };
  const getUser = (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`/api/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
          }),
        });
        const json = await response.json();
        resolve(json);
      } catch (error) {
        reject(error);
      }
    });
  };
  return {
    getMe,
    getUser,
  };
};

export default useUser;
