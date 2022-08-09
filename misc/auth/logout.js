import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(q.Logout(true));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
