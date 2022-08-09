import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index('all_letters')), {size: 3}),
    //     q.Lambda('Cool_Select', q.Get(q.Var('Cool_Select')))
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Paginate(q.Match(q.Index('all_Pilots')), {size: 1})
    // );

    // console.log(response);

    response = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_Pilots'))),
        q.Lambda('pilotRef', q.Get(q.Var('pilotRef')))
      )
    );

    console.log(response);

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index('all_letters')), {
    //       size: 3,
    //       after: [q.Ref(q.Collection('Letters'), '104')],
    //     }),
    //     q.Lambda('Cool_Select', q.Get(q.Var('Cool_Select')))
    //   )
    // );

    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index('all_people'))),
    //     q.Lambda('Cool_Select', q.Get(q.Var('Cool_Select')))
    //   )
    // );
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
