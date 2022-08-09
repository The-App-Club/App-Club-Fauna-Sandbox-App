import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(q.CreateCollection({name: 'users'}));
    console.log(response);

    response = await client.query(q.CreateCollection({name: 'salary'}));
    console.log(response);

    response = await client.query(
      q.CreateCollection({name: 'user_subordinate'})
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
