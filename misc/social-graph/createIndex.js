import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.CreateIndex({
        name: 'people_by_name',
        source: q.Collection('people'),
        terms: [{field: ['data', 'name']}],
        unique: true,
      })
    );
    console.log(response);

    response = await client.query(
      q.CreateIndex({
        name: 'followers_by_followee',
        source: q.Collection('relationships'),
        terms: [{field: ['data', 'followee']}],
        values: [{field: ['data', 'follower']}],
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
