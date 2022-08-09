import {client, q} from './config';

(async () => {
  try {
    let response;

    response = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_DockRepairs'))),
        q.Lambda(
          'repairRef',
          q.Let(
            {
              repairDoc: q.Get(q.Var('repairRef')),
            },
            {
              durationMinutes: q.If(
                q.Or(
                  q.IsNull(
                    q.Select(
                      ['data', 'startTimestamp'],
                      q.Var('repairDoc'),
                      null
                    )
                  ),
                  q.IsNull(
                    q.Select(['data', 'endTimestamp'], q.Var('repairDoc'), null)
                  )
                ),
                null,
                q.TimeDiff(
                  q.Select(['data', 'endTimestamp'], q.Var('repairDoc')),
                  q.Select(['data', 'startTimestamp'], q.Var('repairDoc')),
                  'minutes'
                )
              ),
              repair: q.Var('repairDoc'),
            }
          )
        )
      )
    );

    console.log(JSON.stringify(response, null, 2));

    // response = await client.query(
    //   q.Let(
    //     {
    //       planetDoc: q.Get(
    //         q.Ref(q.Collection('Planets'), '326090229055226451')
    //       ),
    //     },
    //     {
    //       planet: q.Var('planetDoc'),
    //       moons: q.Map(
    //         q.Select(['data', 'moonRefs'], q.Var('planetDoc')),
    //         q.Lambda('moonRef', q.Get(q.Var('moonRef')))
    //       ),
    //     }
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Let(
    //     {
    //       planetDoc: q.Get(
    //         q.Ref(q.Collection('Planets'), '326090229055226451')
    //       ),
    //     },
    //     {
    //       planet: q.Let(
    //         {},
    //         {
    //           id: q.Select(['ref', 'id'], q.Var('planetDoc')),
    //           name: q.Select(['data', 'name'], q.Var('planetDoc')),
    //           moons: q.Map(
    //             q.Select(['data', 'moonRefs'], q.Var('planetDoc')),
    //             q.Lambda(
    //               'moonRef',
    //               q.Let(
    //                 {
    //                   moonDoc: q.Get(q.Var('moonRef')),
    //                 },
    //                 {
    //                   id: q.Select(['ref', 'id'], q.Var('moonDoc')),
    //                   name: q.Select(['data', 'name'], q.Var('moonDoc')),
    //                 }
    //               )
    //             )
    //           ),
    //         }
    //       ),
    //     }
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index('fruits_index'))),
    //     q.Lambda('Y', q.Get(q.Var('Y')))
    //   )
    // );
    // console.log(response);

    // response = await client.query(q.Paginate(q.Match(q.Index('all_Pilots'))));
    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index('all_Pilots'))),
    //     q.Lambda('pilotRef', q.Get(q.Var('pilotRef')))
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Paginate(q.Match(q.Index('all_Pilots_sorted_by_name')))
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Paginate(q.Match(q.Index('all_Pilots_sorted_by_name_desc')))
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index('all_Pilots_sorted_by_name'))),
    //     q.Lambda('pilotResult', q.Get(q.Select([1], q.Var('pilotResult'))))
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index('all_Pilots_sorted_by_name'))),
    //     q.Lambda(['name', 'pilotRef'], q.Get(q.Var('pilotRef')))
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index('all_Planets'))),
    //     q.Lambda('X', q.Get(q.Var('X')))
    //   )
    // );
    // console.log(JSON.stringify(response, null, 2));

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index('all_Planets_by_type'), 'GAS')),
    //     q.Lambda('X', q.Get(q.Var('X')))
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Paginate(q.Match(q.Index('all_Spaceships_by_pendingFuelTons')))
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index('all_Planets_by_firstLetter'), 'M')),
    //     q.Lambda('planetDoc', q.Get(q.Var('planetDoc')))
    //   )
    // );
    // console.log(JSON.stringify(response, null, 2));

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index('all_Spaceships_by_color'), 'WHITE')),
    //     q.Lambda(
    //       'shipRef',
    //       q.Let(
    //         {
    //           shipDoc: q.Get(q.Var('shipRef')),
    //         },
    //         {
    //           name: q.Select(['data', 'name'], q.Var('shipDoc')),
    //           colors: q.Select(['data', 'colors'], q.Var('shipDoc')),
    //         }
    //       )
    //     )
    //   )
    // );

    // console.log(JSON.stringify(response, null, 2));

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index('filter_Spaceships_by_letter'), 'V')),
    //     q.Lambda(
    //       'shipRef',
    //       q.Let(
    //         {
    //           shipDoc: q.Get(q.Var('shipRef')),
    //         },
    //         {
    //           name: q.Select(['data', 'name'], q.Var('shipDoc')),
    //         }
    //       )
    //     )
    //   )
    // );
    // console.log(response);

    // response = await client.query(q.Paginate(q.Match(q.Index('all_Keycards'))));
    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(
    //       q.Match(q.Index('all_Planets_by_type_sorted_by_name'), 'TERRESTRIAL')
    //     ),
    //     q.Lambda('planetResult', q.Get(q.Select([1], q.Var('planetResult'))))
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Get(q.Match(q.Index('all_Spaceships_by_code'), 'ROCINANTE'))
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(
    //       q.Union(
    //         q.Match(q.Index('all_Planets_by_type'), 'GAS'),
    //         q.Match(q.Index('all_Planets_by_color'), 'YELLOW')
    //       )
    //     ),
    //     q.Lambda('planetRef', q.Get(q.Var('planetRef')))
    //   )
    // );

    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(
    //       q.Intersection(
    //         q.Match(q.Index('all_Planets_by_type'), 'TERRESTRIAL'),
    //         q.Match(q.Index('all_Planets_by_color'), 'BLUE')
    //       )
    //     ),
    //     q.Lambda('planetRef', q.Get(q.Var('planetRef')))
    //   )
    // );

    // console.log(JSON.stringify(response, null, 2));

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(
    //       q.Difference(
    //         q.Match(q.Index('all_Planets_by_type'), 'GAS'),
    //         q.Match(q.Index('all_Planets_by_color'), 'BLUE'),
    //         q.Match(q.Index('all_Planets_by_color'), 'RED')
    //       )
    //     ),
    //     q.Lambda('planetRef', q.Get(q.Var('planetRef')))
    //   )
    // );

    // console.log(JSON.stringify(response, null, 2));

    // response = await client.query(q.Paginate(q.Match(q.Index('all_Pilots'))));
    // console.log(response);

    // response = await client.query(q.Get(q.Ref(q.Collection('Posts'), '1')));
    // console.log(response);

    // response = await client.query(
    //   q.Get(q.Match(q.Index('posts_by_title'), 'My cat and other marvels'))
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index('all_Spaceships'))),
    //     q.Lambda('Z', q.Get(q.Var('Z')))
    //   )
    // );
    // console.log(JSON.stringify(response, null, 2));

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index('all_Spaceships'))),
    //     q.Lambda(
    //       'shipRef',
    //       q.Let(
    //         {
    //           shipDoc: q.Get(q.Var('shipRef')),
    //         },
    //         {
    //           id: q.Select(['ref', 'id'], q.Var('shipDoc')),
    //           name: q.Select(['data', 'name'], q.Var('shipDoc')),
    //           position: q.Select(['data', 'position'], q.Var('shipDoc')),
    //         }
    //       )
    //     )
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     q.Paginate(q.Match(q.Index('all_letters'))),
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
