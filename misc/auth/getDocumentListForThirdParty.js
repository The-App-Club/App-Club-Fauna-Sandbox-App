import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Paginate(
        q.Match(
          q.Index('tokens_by_instance'),
          q.Select('instance', q.CurrentIdentity())
        )
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
