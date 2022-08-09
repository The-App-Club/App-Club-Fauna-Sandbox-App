import { client, q } from './config';

(async () => {
  try {
    const { data } = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('store'))),
        q.Lambda('X', q.Get(q.Var('X')))
      )
    );
    console.log(data);
    const {
      data: [count],
    } = await client.query(
      q.Count(q.Paginate(q.Documents(q.Collection('store'))))
    );
    console.log(count);
  } catch (error) {
    console.log(error);
  }
})();
