import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.CreateIndex({
        name: 'people_search_by_first',
        source: q.Collection('People'),
        terms: [
          {
            field: ['data', 'first'],
          },
        ],
      })
    );
    console.log(response);

    response = await client.query(
      q.CreateIndex({
        name: 'people_search_by_degrees',
        source: q.Collection('People'),
        terms: [
          {
            field: ['data', 'degrees'],
          },
        ],
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
