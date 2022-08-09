import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Update(q.Ref(q.Collection('Spaceships'), '326118020295426642'), {
        data: {
          pilotRef: q.Ref(q.Collection('SpaceUsers'), '326117812983562835'),
        },
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
