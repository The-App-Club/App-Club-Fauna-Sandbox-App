import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.At(
        1647322471960000,
        q.Map(
          q.Paginate(q.Match(q.Index('all_shapes'))),
          q.Lambda('X', q.Get(q.Var('X')))
        )
      )
    );
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
})();
