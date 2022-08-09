import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Do(
        q.CreateIndex({
          name: 'people_search_by_last',
          source: q.Collection('People'),
          terms: [{field: ['data', 'last']}],
        }),
        q.CreateIndex({
          name: 'people_sort_by_letter_asc',
          source: q.Collection('People'),
          terms: [{field: ['ref']}],
          values: [{field: ['data', 'letter']}, {field: ['ref']}],
        })
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
