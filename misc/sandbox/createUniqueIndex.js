import {client, q} from './config';

(async () => {
  try {
    let response;

    response = await client.query(
      q.CreateIndex({
        name: 'only_one_Moon_per_planet',
        source: [q.Collection('Moons')],
        terms: [{field: ['data', 'planetRef']}],
        unique: true,
      })
    );
    console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_Spaceships_by_code',
    //     source: q.Collection('Spaceships'),
    //     terms: [{field: ['data', 'code']}],
    //     unique: true,
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_Keycards',
    //     source: {
    //       collection: q.Collection('Spaceships'),
    //       fields: {
    //         keyCardId: q.Query(
    //           q.Lambda(
    //             'shipDoc',
    //             q.UpperCase(
    //               q.ReplaceStr(
    //                 q.Select(['data', 'name'], q.Var('shipDoc')),
    //                 ' ',
    //                 '_'
    //               )
    //             )
    //           )
    //         ),
    //       },
    //     },
    //     values: [{binding: 'keyCardId'}],
    //     unique: true,
    //   })
    // );
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
