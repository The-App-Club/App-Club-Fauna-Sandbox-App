import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Delete(q.Ref(q.Collection('shapes'), '326173848718279251'))
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
