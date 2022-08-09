import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(q.CreateCollection({name: 'shapes'}));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
