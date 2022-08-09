import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(q.Delete(q.Collection('test')));
    response = await client.query(q.Delete(q.Collection('Letters')));
    response = await client.query(q.Delete(q.Collection('People')));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
