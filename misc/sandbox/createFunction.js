import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(
    //   q.CreateFunction({
    //     name: 'GetSpaceship',
    //     body: q.Query(
    //       q.Lambda(
    //         'shipId',
    //         q.Let(
    //           {
    //             shipDoc: q.Get(
    //               q.Ref(q.Collection('Spaceships'), q.Var('shipId'))
    //             ),
    //           },
    //           {
    //             id: q.Select(['ref', 'id'], q.Var('shipDoc')),
    //             name: q.Select(['data', 'name'], q.Var('shipDoc')),
    //           }
    //         )
    //       )
    //     ),
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateFunction({
    //     name: 'StopIt',
    //     body: q.Query(
    //       q.Lambda(
    //         'bool',
    //         q.If(q.Var('bool'), q.Abort('Stopped!'), 'Not stopped!')
    //       )
    //     ),
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateFunction({
    //     name: 'HasEnoughFuelToWarp',
    //     body: q.Query(
    //       q.Lambda(
    //         'shipRef',
    //         q.Let(
    //           {
    //             shipDoc: q.Get(q.Var('shipRef')),
    //             actualFuelTons: q.Select(
    //               ['data', 'actualFuelTons'],
    //               q.Var('shipDoc')
    //             ),
    //           },
    //           q.GTE(q.Var('actualFuelTons'), 5)
    //         )
    //       )
    //     ),
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateFunction({
    //     name: 'OpenWormholeAndWarp',
    //     body: q.Query(
    //       q.Lambda(
    //         'shipRef',
    //         q.Update(
    //           q.Var('shipRef'),
    //           q.Let(
    //             {
    //               shipDoc: q.Get(q.Var('shipRef')),
    //               actualFuelTons: q.Select(
    //                 ['data', 'actualFuelTons'],
    //                 q.Var('shipDoc')
    //               ),
    //             },
    //             {
    //               data: {
    //                 actualFuelTons: q.Subtract(q.Var('actualFuelTons'), 5),
    //               },
    //             }
    //           )
    //         )
    //       )
    //     ),
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateFunction({
    //     name: 'CreateLogEntry',
    //     body: q.Query(
    //       q.Lambda(
    //         ['shipRef', 'planetRef', 'status'],
    //         q.Create(q.Collection('ShipLogs'), {
    //           data: {
    //             shipRef: q.Var('shipRef'),
    //             planetRef: q.Var('planetRef'),
    //             status: q.Var('status'),
    //           },
    //         })
    //       )
    //     ),
    //   })
    // );
    // console.log(response);
    // response = await client.query(
    //   q.CreateFunction({
    //     name: 'WarpToPlanet',
    //     body: q.Query(
    //       q.Lambda(
    //         ['shipRef', 'planetRef'],
    //         q.If(
    //           q.Call(q.Function('HasEnoughFuelToWarp'), q.Var('shipRef')),
    //           q.Do(
    //             q.Call(q.Function('OpenWormholeAndWarp'), q.Var('shipRef')),
    //             q.Call(q.Function('CreateLogEntry'), [
    //               q.Var('shipRef'),
    //               q.Var('planetRef'),
    //               'WARPED_TO_PLANET',
    //             ]),
    //             q.Let(
    //               {
    //                 planetDoc: q.Get(q.Var('planetRef')),
    //                 planetName: q.Select(['data', 'name'], q.Var('planetDoc')),
    //                 shipDoc: q.Get(q.Var('shipRef')),
    //                 shipName: q.Select(['data', 'name'], q.Var('shipDoc')),
    //               },
    //               q.Concat([
    //                 'Welcome ',
    //                 q.Var('shipName'),
    //                 ' to ',
    //                 q.Var('planetName'),
    //               ])
    //             )
    //           ),
    //           q.Abort('Not enough fuel!')
    //         )
    //       )
    //     ),
    //   })
    // );
    // console.log(response);

    response = await client.query(
      q.CreateFunction({
        name: 'RecordPositions',
        body: q.Query(
          q.Lambda(
            'bool',
            q.Do(
              q.Create(
                q.Collection('ShipPositionsHistory'),
                q.Let(
                  {
                    shipsDocuments: q.Map(
                      q.Paginate(q.Documents(q.Collection('Spaceships'))),
                      q.Lambda('shipRef', q.Get(q.Var('shipRef')))
                    ),
                    positions: q.Map(
                      q.Var('shipsDocuments'),
                      q.Lambda('shipDocument', {
                        ref: q.Select(['ref'], q.Var('shipDocument')),
                        name: q.Select(['data', 'name'], q.Var('shipDocument')),
                        position: q.Select(
                          ['data', 'position'],
                          q.Var('shipDocument')
                        ),
                      })
                    ),
                  },
                  {
                    data: {
                      timestamp: q.Now(),
                      positions: q.Var('positions'),
                    },
                  }
                )
              ),
              'Positions recorded'
            )
          )
        ),
      })
    );

    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
