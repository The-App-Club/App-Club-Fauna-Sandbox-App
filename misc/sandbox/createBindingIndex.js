import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'people_by_rolodex',
    //     source: {
    //       collection: q.Collection('People'),
    //       fields: {
    //         rolodex: q.Query(
    //           q.Lambda(
    //             'doc',
    //             q.SubString(q.Select(['data', 'last'], q.Var('doc')), 0, 1)
    //           )
    //         ),
    //       },
    //     },
    //     terms: [{binding: 'rolodex'}],
    //     values: [
    //       {binding: 'rolodex'},
    //       {field: ['data', 'last']},
    //       {field: ['ref']},
    //     ],
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'people_by_letter',
    //     source: q.Collection('People'),
    //     terms: [{field: ['data', 'letter']}],
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'people_by_null_letter',
    //     source: [
    //       {
    //         collection: q.Collection('People'),
    //         fields: {
    //           null_letter: q.Query(
    //             q.Lambda(
    //               'doc',
    //               q.Equals(
    //                 q.Select(['data', 'letter'], q.Var('doc'), null),
    //                 null
    //               )
    //             )
    //           ),
    //         },
    //       },
    //     ],
    //     terms: [{binding: 'null_letter'}],
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_Spaceships_by_pendingFuelTons',
    //     source: {
    //       collection: q.Collection('Spaceships'),
    //       fields: {
    //         pendingFuelTons: q.Query(
    //           q.Lambda(
    //             'shipDoc',
    //             q.Subtract(
    //               q.Select(['data', 'maxFuelTons'], q.Var('shipDoc')),
    //               q.Select(['data', 'actualFuelTons'], q.Var('shipDoc'))
    //             )
    //           )
    //         ),
    //       },
    //     },
    //     values: [{binding: 'pendingFuelTons'}, {field: ['data', 'name']}],
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_Planets_by_firstLetter',
    //     source: {
    //       collection: q.Collection('Planets'),
    //       fields: {
    //         firstLetter: q.Query(
    //           q.Lambda(
    //             'planetDoc',
    //             q.SubString(
    //               q.Select(['data', 'name'], q.Var('planetDoc')),
    //               0,
    //               1
    //             )
    //           )
    //         ),
    //       },
    //     },
    //     terms: [{binding: 'firstLetter'}],
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'filter_Spaceships_by_letter',
    //     source: {
    //       collection: q.Collection('Spaceships'),
    //       fields: {
    //         nameLetters: q.Query(
    //           q.Lambda(
    //             'shipDoc',
    //             q.NGram(q.Select(['data', 'name'], q.Var('shipDoc')), 1, 1)
    //           )
    //         ),
    //       },
    //     },
    //     terms: [{binding: 'nameLetters'}],
    //   })
    // );
    // console.log(response);

    response = await client.query(
      q.CreateIndex({
        name: 'all_DockRepairs_with_duration',
        source: {
          collection: q.Collection('DockRepairs'),
          fields: {
            durationMinutes: q.Query(
              q.Lambda(
                'repairDoc',
                q.If(
                  q.Or(
                    q.IsNull(
                      q.Select(
                        ['data', 'startTimestamp'],
                        q.Var('repairDoc'),
                        null
                      )
                    ),
                    q.IsNull(
                      q.Select(
                        ['data', 'endTimestamp'],
                        q.Var('repairDoc'),
                        null
                      )
                    )
                  ),
                  null,
                  q.TimeDiff(
                    q.Select(['data', 'endTimestamp'], q.Var('repairDoc')),
                    q.Select(['data', 'startTimestamp'], q.Var('repairDoc')),
                    'minutes'
                  )
                )
              )
            ),
          },
        },
        values: [
          {binding: 'durationMinutes'},
          {field: ['ref', 'id']},
          {field: ['data', 'status']},
        ],
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
