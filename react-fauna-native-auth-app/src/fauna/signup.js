import { q } from './config';
const signup = ({ client, email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response;
      response = await client.query(
        q.Create(q.Collection('accounts'), {
          credentials: { password: password },
          data: {
            email: email,
          },
        })
      );
      const { data, ref } = { ...response };
      const auth = await client.query(
        q.Login(response.ref, {
          password,
        })
      );
      resolve({ ...data, id: ref.id, token: auth.secret });
    } catch (error) {
      reject(error);
    }
  });
};

export { signup };
