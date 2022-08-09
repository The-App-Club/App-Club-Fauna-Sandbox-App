import {client, q} from './config';

(async () => {
  try {
    const responseGetIndex = await client.query(q.Get(q.Index('fruits_index')));

    console.log(responseGetIndex);
  } catch (error) {
    console.log(error);
  }
})();
