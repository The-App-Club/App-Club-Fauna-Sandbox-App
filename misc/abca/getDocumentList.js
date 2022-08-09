import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_salaries'))),
        q.Lambda(
          'salaryRef',
          q.Let(
            {
              salary: q.Get(q.Var('salaryRef')),
              user: q.Get(q.Select(['data', 'user'], q.Var('salary'))),
            },
            {
              user: q.Select(['data', 'name'], q.Var('user')),
              salary: q.Select(['data', 'salary'], q.Var('salary')),
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
