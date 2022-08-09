import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.CreateRole({
        name: 'normal_user',
        membership: {
          resource: q.Collection('users'),
        },
        privileges: [
          {resource: q.Collection('users'), actions: {read: true}},
          {resource: q.Index('all_users'), actions: {read: true}},
          {resource: q.Index('all_salaries'), actions: {read: true}},
          {
            resource: q.Collection('salary'),
            actions: {
              read: q.Query(
                q.Lambda(
                  'salaryRef',
                  q.Let(
                    {
                      salary: q.Get(q.Var('salaryRef')),
                      userRef: q.Select(['data', 'user'], q.Var('salary')),
                    },
                    q.Or(
                      q.Equals(q.Var('userRef'), q.CurrentIdentity()),
                      q.Exists(
                        q.Match(q.Index('is_subordinate'), [
                          q.Var('userRef'),
                          q.CurrentIdentity(),
                        ])
                      )
                    )
                  )
                )
              ),
            },
          },
        ],
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
