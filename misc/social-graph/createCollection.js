import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(q.CreateCollection({name: 'people'}));
    console.log(response);
    response = await client.query(q.CreateCollection({name: 'relationships'}));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
