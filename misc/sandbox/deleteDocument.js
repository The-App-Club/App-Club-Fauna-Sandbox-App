import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(
    //   q.Delete(q.Ref(q.Collection('Spaceships'), '326021417273393748'))
    // );
    // console.log(response);
    response = await client.query(q.Delete(q.Ref(q.Collection('Posts'), '1')));
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
