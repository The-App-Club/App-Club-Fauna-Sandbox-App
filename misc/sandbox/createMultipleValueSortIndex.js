import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.CreateIndex({
        name: 'people_sort_by_last_first_asc',
        source: q.Collection('People'),
        values: [
          {field: ['data', 'last']},
          {field: ['data', 'first']},
          {field: ['ref']},
        ],
      })
    );
    console.log(response);
    response = await client.query(
      q.CreateIndex({
        name: 'people_sort_by_last_asc_first_desc',
        source: q.Collection('People'),
        values: [
          {field: ['data', 'last']},
          {field: ['data', 'first'], reverse: true},
          {field: ['ref']},
        ],
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
