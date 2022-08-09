import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('Spaceships'))),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
