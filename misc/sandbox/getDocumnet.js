import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(q.Get(q.Ref(q.Collection('Letters'), '103')));
    console.log(response);

    response = await client.query(
      q.Get(q.Ref(q.Collection('Spaceships'), '326021417273393748'))
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
