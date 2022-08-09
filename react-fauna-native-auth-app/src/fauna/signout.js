import { q } from './config';

const signout = ({ client }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response;
      response = await client.query(q.Logout(true));
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export { signout };
