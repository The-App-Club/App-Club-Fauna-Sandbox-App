import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(q.Get(q.Collection('stores')));
    console.log(response);
    response = await client.query(q.Get(q.Collection('Planets')));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
