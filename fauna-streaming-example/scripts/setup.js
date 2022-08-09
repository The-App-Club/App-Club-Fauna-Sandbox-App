import { client, q } from './config';

(async () => {
  try {
    const response = await client.query(
      q.If(
        q.Not(q.Exists(q.Collection('store'))),
        q.CreateCollection({ name: 'store' }),
        `already exists, not create collection.`
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
