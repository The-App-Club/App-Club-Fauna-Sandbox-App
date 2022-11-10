import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';
import {useCookies} from 'react-cookie';
import {toast} from 'react-toastify';

const useAuth = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);

  const signup = (formData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const resultInfo = await response.json();
        if (resultInfo.httpStatus === 200) {
          setCookie('fauna_token', resultInfo.token);
          toast(`サインアップしました`, {
            className: cx(
              css`
                font-weight: 700;
                font-size: 0.875rem; /* 14px */
                line-height: 1.25rem; /* 20px */
                font-family: 'Inter', sans-serif;
              `
            ),
            type: 'success',
            position: toast.POSITION.BOTTOM_RIGHT,
            onClose: (e) => {
              resolve(resultInfo);
            },
          });
        } else {
          toast(
            `サインアップに失敗しました[${resultInfo.httpStatus}]${resultInfo.message}`,
            {
              className: cx(
                css`
                  font-weight: 700;
                  font-size: 0.875rem; /* 14px */
                  line-height: 1.25rem; /* 20px */
                  font-family: 'Inter', sans-serif;
                `
              ),
              type: 'error',
              position: toast.POSITION.BOTTOM_RIGHT,
              onClose: (e) => {
                reject(resultInfo);
              },
            }
          );
        }
      } catch (error) {
        toast(`システムエラーが起きました`, {
          className: cx(
            css`
              font-weight: 700;
              font-size: 0.875rem; /* 14px */
              line-height: 1.25rem; /* 20px */
              font-family: 'Inter', sans-serif;
            `
          ),
          type: 'error',
          position: toast.POSITION.BOTTOM_RIGHT,
          onClose: (e) => {
            reject(error);
          },
        });
      }
    });
  };

  const logout = () => {
    return new Promise(async (resolve, reject) => {
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
          toast(`ログアウトしました`, {
            className: cx(
              css`
                font-weight: 700;
                font-size: 0.875rem; /* 14px */
                line-height: 1.25rem; /* 20px */
                font-family: 'Inter', sans-serif;
              `
            ),
            type: 'success',
            position: toast.POSITION.BOTTOM_RIGHT,
            onClose: (e) => {
              resolve(resultInfo);
            },
          });
        } else {
          toast(
            `ログアウトに失敗しました[${resultInfo.httpStatus}]${resultInfo.message}`,
            {
              className: cx(
                css`
                  font-weight: 700;
                  font-size: 0.875rem; /* 14px */
                  line-height: 1.25rem; /* 20px */
                  font-family: 'Inter', sans-serif;
                `
              ),
              type: 'error',
              position: toast.POSITION.BOTTOM_RIGHT,
              onClose: (e) => {
                reject(resultInfo);
              },
            }
          );
        }
      } catch (error) {
        toast(`システムエラーが起きました`, {
          className: cx(
            css`
              font-weight: 700;
              font-size: 0.875rem; /* 14px */
              line-height: 1.25rem; /* 20px */
              font-family: 'Inter', sans-serif;
            `
          ),
          type: 'error',
          position: toast.POSITION.BOTTOM_RIGHT,
          onClose: (e) => {
            reject(error);
          },
        });
      }
    });
  };

  const login = (formData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const resultInfo = await response.json();
        if (resultInfo.httpStatus === 200) {
          setCookie('fauna_token', resultInfo.token);
          toast(`ログインしました`, {
            className: cx(
              css`
                font-weight: 700;
                font-size: 0.875rem; /* 14px */
                line-height: 1.25rem; /* 20px */
                font-family: 'Inter', sans-serif;
              `
            ),
            type: 'success',
            position: toast.POSITION.BOTTOM_RIGHT,
            onClose: (e) => {
              resolve(resultInfo);
            },
          });
          resolve(resultInfo);
        } else {
          toast(
            `ログインに失敗しました[${resultInfo.httpStatus}]${resultInfo.message}`,
            {
              className: cx(
                css`
                  font-weight: 700;
                  font-size: 0.875rem; /* 14px */
                  line-height: 1.25rem; /* 20px */
                  font-family: 'Inter', sans-serif;
                `
              ),
              type: 'error',
              position: toast.POSITION.BOTTOM_RIGHT,
              onClose: (e) => {
                reject(resultInfo);
              },
            }
          );
        }
      } catch (error) {
        toast(`システムエラーが起きました`, {
          className: cx(
            css`
              font-weight: 700;
              font-size: 0.875rem; /* 14px */
              line-height: 1.25rem; /* 20px */
              font-family: 'Inter', sans-serif;
            `
          ),
          type: 'error',
          position: toast.POSITION.BOTTOM_RIGHT,
          onClose: (e) => {
            reject(error);
          },
        });
      }
    });
  };

  return {logout, login, signup};
};

export default useAuth;
