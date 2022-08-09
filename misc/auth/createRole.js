import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(
    //   q.CreateRole({
    //     name: 'User',
    //     membership: {
    //       resource: q.Collection('SpaceUsers'),
    //     },
    //     privileges: [
    //       {resource: q.Collection('Spaceships'), actions: {read: true}},
    //     ],
    //   })
    // );
    // console.log(response);

    response = await client.query(
      q.CreateRole({
        name: 'Pilot',
        membership: {
          resource: q.Collection('SpaceUsers'),
          predicate: q.Query(
            q.Lambda(
              'ref',
              q.Select(['data', 'isPilot'], q.Get(q.Var('ref')), false)
            )
          ),
        },
        privileges: [
          {resource: q.Collection('Spaceships'), actions: {create: true}},
        ],
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
