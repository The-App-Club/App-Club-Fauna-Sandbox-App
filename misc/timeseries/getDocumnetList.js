import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_shapes'))),
        q.Lambda('X', q.Get(q.Var('X')))
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
