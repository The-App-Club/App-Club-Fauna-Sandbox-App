import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.CreateIndex({
        name: 'all_shapes',
        source: q.Collection('shapes'),
      })
    );
    console.log(response);

    response = await client.query(
      q.CreateIndex({
        name: 'shapes_by_name',
        source: q.Collection('shapes'),
        unique: true,
        terms: [{field: ['data', 'name']}],
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
