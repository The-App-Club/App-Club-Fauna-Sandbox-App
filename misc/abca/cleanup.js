import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Map(
        q.Paginate(q.Collections()),
        q.Lambda('ref', q.Delete(q.Var('ref')))
      )
    );
    console.log(response);
    response = await client.query(
      q.Map(q.Paginate(q.Indexes()), q.Lambda('ref', q.Delete(q.Var('ref'))))
    );
    console.log(response);

    response = await client.query(
      q.Map(q.Paginate(q.Functions()), q.Lambda('ref', q.Delete(q.Var('ref'))))
    );
    console.log(response);

    response = await client.query(
      q.Map(q.Paginate(q.Roles()), q.Lambda('ref', q.Delete(q.Var('ref'))))
    );
    console.log(response);

    response = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Tokens())),
        q.Lambda('ref', q.Delete(q.Var('ref')))
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
