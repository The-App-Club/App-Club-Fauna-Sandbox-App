import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(
    //   q.Map(
    //     [
    //       ['Bob', 95000],
    //       ['Joe', 60000],
    //       ['John', 70000],
    //       ['Peter', 97000],
    //       ['Mary', 120000],
    //       ['Carol', 150000],
    //     ],
    //     q.Lambda(
    //       'data',
    //       q.Let(
    //         {
    //           user: q.Create(q.Collection('users'), {
    //             data: {name: q.Select(0, q.Var('data'))},
    //             credentials: {password: '123'},
    //           }),
    //           salary: q.Select(1, q.Var('data')),
    //         },
    //         q.Create(q.Collection('salary'), {
    //           data: {
    //             user: q.Select('ref', q.Var('user')),
    //             salary: q.Var('salary'),
    //           },
    //         })
    //       )
    //     )
    //   )
    // );
    // console.log(response);

    response = await client.query(
      q.Map(
        [
          ['Bob', 'Mary'],
          ['John', 'Mary'],
          ['Peter', 'Joe'],
        ],
        q.Lambda(
          'data',
          q.Let(
            {
              user: q.Get(
                q.Match(q.Index('user_by_name'), q.Select(0, q.Var('data')))
              ),
              manager: q.Get(
                q.Match(q.Index('user_by_name'), q.Select(1, q.Var('data')))
              ),
            },
            q.Create(q.Collection('user_subordinate'), {
              data: {
                user: q.Select('ref', q.Var('user')),
                reports_to: q.Select('ref', q.Var('manager')),
              },
            })
          )
        )
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
