import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Get(q.Match(q.Index("people_by_name"), "Alice"))
    );
    console.log(response);

    response = await client.query(
      q.Select("ref", q.Get(q.Match(q.Index("people_by_name"), "Alice")))
    );
    console.log(response);

    } catch (error) {
    console.log(error);
  }
})();
