import { q } from './config';

const signin = ({ client, email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response;
      response = await client.query(
        q.Login(q.Match(q.Index('accounts_by_email'), email), {
          password: password,
        })
      );
      const { secret } = { ...response };
      resolve({ token: secret });
    } catch (error) {
      reject(error);
    }
  });
};
export { signin };
