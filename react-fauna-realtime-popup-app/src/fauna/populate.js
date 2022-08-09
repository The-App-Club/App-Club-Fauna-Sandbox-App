import {client, q} from './config';
import {createData} from '../plugins/utils';
(async () => {
  try {
    let response;
    response = await client.query(
      q.Create(q.Collection('gift'), {
        data: createData(),
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
