import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Paginate(q.Match(q.Index('people_sort_by_first_asc')))
    );
    console.log(response);
    response = await client.query(
      q.Paginate(q.Match(q.Index('people_sort_by_first_desc')))
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
