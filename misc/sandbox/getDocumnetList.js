import {client, q} from './config';

(async () => {
  try {
    let response;

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Documents(q.Collection('Moons'))),
    //     q.Lambda('moonRef', q.Get(q.Var('moonRef')))
    //   )
    // );
    // console.log(response);

    response = await client.query(
      q.Let(
        {
          planetDoc: q.Get(
            q.Ref(q.Collection('Planets'), '326088991077040724')
          ),
        },
        {
          planet: q.Var('planetDoc'),
          // moons: q.Map(
          //   q.Select(['data', 'moonRefs'], q.Var('planetDoc')),
          //   q.Lambda('moonRef', q.Get(q.Var('moonRef')))
          // ),
        }
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
