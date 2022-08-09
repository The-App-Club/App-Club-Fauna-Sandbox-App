import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Create(q.Tokens(), {
        instance: q.Ref(q.Collection('SpaceUsers'), '326116461225443924'),
        ttl: q.TimeAdd(q.Now(), 3, 'hour'),
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
