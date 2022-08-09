import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Call(
        q.Function('OpenHatch'),
        q.Ref(q.Collection('Spaceships'), '326118069247148626')
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
