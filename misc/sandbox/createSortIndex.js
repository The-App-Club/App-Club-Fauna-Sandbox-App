import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.CreateIndex({
        name: 'people_sort_by_first_asc',
        source: q.Collection('People'),
        values: [{field: ['data', 'first']}, {field: ['ref']}],
      })
    );
    console.log(response);
    response = await client.query(
      q.CreateIndex({
        name: 'people_sort_by_first_desc',
        source: q.Collection('People'),
        values: [{field: ['data', 'first'], reverse: true}, {field: ['ref']}],
      })
    );
    console.log(response);

    response = await client.query(
      q.CreateIndex({
        name: 'letters_sort_by_extra_asc',
        source: q.Collection('Letters'),
        values: [{field: ['data', 'extra']}, {field: ['ref']}],
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
