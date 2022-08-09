import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(q.CreateCollection({name: 'customers'}));
    console.log(response);
    response = await client.query(q.CreateCollection({name: 'products'}));
    console.log(response);
    response = await client.query(q.CreateCollection({name: 'orders'}));
    console.log(response);
    response = await client.query(q.CreateCollection({name: 'stores'}));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
