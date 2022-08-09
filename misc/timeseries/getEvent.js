import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Paginate(
        q.Events(
          q.Select('ref', q.Get(q.Match(q.Index('shapes_by_name'), 'circle')))
        )
      )
    );
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log(error);
  }
})();
