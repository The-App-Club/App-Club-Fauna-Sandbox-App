import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Map(
        q.Paginate(
          q.Union(
            q.Match(q.Index('people_search_by_first'), 'Alan'),
            q.Match(q.Index('people_search_by_first'), 'Tim')
          )
        ),
        q.Lambda('person', q.Get(q.Var('person')))
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
