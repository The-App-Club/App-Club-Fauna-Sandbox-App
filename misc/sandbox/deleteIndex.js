import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(q.Delete(q.Index('fruits_index')));
    response = await client.query(q.Delete(q.Index('all_letters')));
    response = await client.query(q.Delete(q.Index('all_people')));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
