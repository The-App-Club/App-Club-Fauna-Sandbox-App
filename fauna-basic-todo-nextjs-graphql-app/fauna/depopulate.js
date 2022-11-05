import {FaunaDBQueryManager, q} from './config';

const client = new FaunaDBQueryManager({}).client;

// https://docs.fauna.com/fauna/current/api/fql/functions/paginate?lang=javascript
const niceDelete = async (response) => {
  if (response.data) {
    await client.query(
      q.Map(response.data, q.Lambda('X', q.Delete(q.Var('X'))))
    );
  }
};
const paginateDelete = async (response) => {
  if (!response.after) {
    await niceDelete(response); // do remain delete. this is teardown.
    return;
  }
  await niceDelete(response); // do current delete
  response = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('Rss')), {
        after: response.after,
      }),
      q.Lambda('X', q.Var('X'))
    )
  );
  return paginateDelete(response);
};

(async () => {
  // Paginate Delete
  const response = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('shows'))),
      q.Lambda('X', q.Var('X'))
    )
  );
  await paginateDelete(response);
  console.log(response);
})();
