import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Update(
        q.Select('ref', q.Get(q.Match(q.Index('shapes_by_name'), 'circle'))),
        {data: {color: 'white'}}
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
