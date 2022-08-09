import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(
    //   q.Update(q.Role('User'), {
    //     privileges: [
    //       {resource: q.Collection('Spaceships'), actions: {read: true}},
    //       {resource: q.Collection('Planets'), actions: {read: true}},
    //     ],
    //   })
    // );
    // console.log(response);
    // response = await client.query(
    //   q.Update(q.Role('User'), {
    //     privileges: [
    //       {resource: q.Collection('Spaceships'), actions: {read: true}},
    //       {resource: q.Collection('Planets'), actions: {read: true}},
    //       {
    //         resource: q.Collection('SpaceUsers'),
    //         actions: {
    //           read: q.Query(
    //             q.Lambda('ref', q.Equals(q.CurrentIdentity(), q.Var('ref')))
    //           ),
    //         },
    //       },
    //     ],
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Update(q.Role('Pilot'), {
    //     privileges: [
    //       {
    //         resource: q.Collection('Spaceships'),
    //         actions: {create: true, write: true},
    //       },
    //       {resource: q.Collection('ShipLogs'), actions: {create: true}},
    //       {resource: q.Function('OpenHatch'), actions: {call: true}},
    //     ],
    //   })
    // );
    // console.log(response)

    response = await client.query(
      q.Update(q.Role('Pilot'), {
        privileges: [
          {
            resource: q.Collection('Spaceships'),
            actions: {create: true, write: true},
          },
          {resource: q.Collection('ShipLogs'), actions: {create: true}},
          {
            resource: q.Function('OpenHatch'),
            actions: {
              call: q.Query(
                q.Lambda(
                  'shipRef',
                  q.Let(
                    {
                      shipDoc: q.Get(q.Var('shipRef')),
                      pilotRef: q.Select(
                        ['data', 'pilotRef'],
                        q.Var('shipDoc'),
                        null
                      ),
                    },
                    q.Equals(q.CurrentIdentity(), q.Var('pilotRef'))
                  )
                )
              ),
            },
          },
        ],
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
