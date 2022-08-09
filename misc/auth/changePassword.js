import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Update(q.Ref(q.Collection('users'), '326112328640627282'), {
        credentials: {password: 'new password'},
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
