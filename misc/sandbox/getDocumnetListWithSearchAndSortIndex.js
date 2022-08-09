import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Map(
        q.Paginate(
          q.Join(
            q.Match(q.Index('people_search_by_last'), 'Cook'),
            q.Index('people_sort_by_letter_asc')
          )
        ),
        q.Lambda(['letter', 'ref'], q.Get(q.Var('ref')))
      )
    );
    console.log(response);

    response = await client.query(
      q.Map(
        q.Paginate(
          q.Join(
            q.Union(
              q.Match(q.Index('people_search_by_last'), 'Turing'),
              q.Match(q.Index('people_search_by_last'), 'Cook')
            ),
            q.Index('people_sort_by_letter_asc')
          )
        ),
        q.Lambda(['letter', 'ref'], q.Get(q.Var('ref')))
      )
    );

    console.log(response);

    response = await client.query(
      q.Map(
        q.Paginate(
          q.Join(
            q.Intersection(
              q.Union(
                q.Match(q.Index('people_search_by_last'), 'Turing'),
                q.Match(q.Index('people_search_by_last'), 'Cook'),
                q.Match(q.Index('people_search_by_first'), 'Grace')
              ),
              q.Match(q.Index('people_search_by_degrees'), 'PhD')
            ),
            q.Index('people_sort_by_letter_asc')
          )
        ),
        q.Lambda(['letter', 'ref'], q.Get(q.Var('ref')))
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
