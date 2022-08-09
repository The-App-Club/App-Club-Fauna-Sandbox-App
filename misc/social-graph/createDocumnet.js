import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Foreach(
        ['Alice', 'Bob', 'Carol', 'Dave'],
        q.Lambda(
          'name',
          q.Create(q.Collection('people'), {data: {name: q.Var('name')}})
        )
      )
    );
    console.log(response);

    response = await client.query(
      q.Create(q.Collection('relationships'), {
        data: {
          follower: q.Select(
            'ref',
            q.Get(q.Match(q.Index('people_by_name'), 'Alice'))
          ),
          followee: q.Select(
            'ref',
            q.Get(q.Match(q.Index('people_by_name'), 'Bob'))
          ),
        },
      })
    );
    console.log(response);

    response = await client.query(
      q.Create(q.Collection('relationships'), {
        data: {
          follower: q.Select(
            'ref',
            q.Get(q.Match(q.Index('people_by_name'), 'Bob'))
          ),
          followee: q.Select(
            'ref',
            q.Get(q.Match(q.Index('people_by_name'), 'Alice'))
          ),
        },
      })
    );
    console.log(response);

    response = await client.query(
      q.Let(
        {
          follower: q.Select(
            'ref',
            q.Get(q.Match(q.Index('people_by_name'), 'Carol'))
          ),
        },
        q.Foreach(
          q.Paginate(
            q.Union(
              q.Match(q.Index('people_by_name'), 'Alice'),
              q.Match(q.Index('people_by_name'), 'Bob')
            )
          ),
          q.Lambda(
            'followee',
            q.Create(q.Collection('relationships'), {
              data: {
                followee: q.Var('followee'),
                follower: q.Var('follower'),
              },
            })
          )
        )
      )
    );
    console.log(response);

    response = await client.query(
      q.Create(q.Collection('relationships'), {
        data: {
          followee: q.Select(
            'ref',
            q.Get(q.Match(q.Index('people_by_name'), 'Alice'))
          ),
          follower: q.Select(
            'ref',
            q.Get(q.Match(q.Index('people_by_name'), 'Dave'))
          ),
        },
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
