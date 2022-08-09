import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Paginate(q.Match(q.Index('people_by_name'), 'Alice'))
    );
    console.log(response);

    response = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('people_by_name'), 'Alice')),
        q.Lambda('person', q.Select(['data', 'name'], q.Get(q.Var('person'))))
      )
    );
    console.log(response);

    response = await client.query(
      q.Map(
        q.Paginate(
          q.Match(
            q.Index('followers_by_followee'),
            q.Select('ref', q.Get(q.Match(q.Index('people_by_name'), 'Alice')))
          )
        ),
        q.Lambda('person', q.Select(['data', 'name'], q.Get(q.Var('person'))))
      )
    );
    console.log(response);

    response = await client.query(
      q.Map(
        q.Paginate(
          q.Union(
            q.Match(
              q.Index('followers_by_followee'),
              q.Select(
                'ref',
                q.Get(q.Match(q.Index('people_by_name'), 'Alice'))
              )
            ),
            q.Match(
              q.Index('followers_by_followee'),
              q.Select('ref', q.Get(q.Match(q.Index('people_by_name'), 'Bob')))
            )
          )
        ),
        q.Lambda('person', q.Select(['data', 'name'], q.Get(q.Var('person'))))
      )
    );
    console.log(response);

    response = await client.query(
      q.Map(
        q.Paginate(
          q.Intersection(
            q.Match(
              q.Index('followers_by_followee'),
              q.Select(
                'ref',
                q.Get(q.Match(q.Index('people_by_name'), 'Alice'))
              )
            ),
            q.Match(
              q.Index('followers_by_followee'),
              q.Select('ref', q.Get(q.Match(q.Index('people_by_name'), 'Bob')))
            )
          )
        ),
        q.Lambda('person', q.Select(['data', 'name'], q.Get(q.Var('person'))))
      )
    );
    console.log(response);

    response = await client.query(
      q.Map(
        q.Paginate(
          q.Difference(
            q.Match(
              q.Index('followers_by_followee'),
              q.Select(
                'ref',
                q.Get(q.Match(q.Index('people_by_name'), 'Alice'))
              )
            ),
            q.Match(
              q.Index('followers_by_followee'),
              q.Select('ref', q.Get(q.Match(q.Index('people_by_name'), 'Bob')))
            )
          )
        ),
        q.Lambda('person', q.Select(['data', 'name'], q.Get(q.Var('person'))))
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
