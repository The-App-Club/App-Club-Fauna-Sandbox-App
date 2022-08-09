import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(
    //   q.Paginate(q.Match(q.Index('people_by_rolodex'), 'C'))
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Paginate(q.Match(q.Index('people_by_letter'), 'A'))
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Paginate(q.Match(q.Index('people_by_letter'), null))
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index('people_by_null_letter'), true)),
    //     q.Lambda('X', q.Get(q.Var('X')))
    //   )
    // );
    // console.log(JSON.stringify(response, null, 2));

    response = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_DockRepairs_with_duration'))),
        q.Lambda(
          'result',
          q.Let(
            {},
            {
              id: q.Select([1], q.Var('result')),
              status: q.Select([2], q.Var('result')),
              durationMinutes: q.Select([0], q.Var('result')),
            }
          )
        )
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
