import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query([
      q.Identify(
        q.Ref(q.Collection('users'), '326112328640627282'),
        'secret password'
      ),
      q.Identify(
        q.Ref(q.Collection('users'), '326112328640627282'),
        'new password'
      ),
    ]);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
