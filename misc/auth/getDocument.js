import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Get(q.Ref(q.Collection('SpaceUsers'), '326116461225443924'))
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
