import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.CreateIndex({
        name: 'all_people_all_fields',
        source: q.Collection('People'),
        values: [
          {field: ['data', 'first']},
          {field: ['data', 'last']},
          {field: ['data', 'degrees']},
          {field: ['data', 'letter']},
          {field: ['ref']},
        ],
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
