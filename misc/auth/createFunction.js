import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.CreateFunction({
        name: 'OpenHatch',
        body: q.Query(
          q.Lambda(
            'shipRef',
            q.Do(
              q.Update(
                q.Var('shipRef'),
                q.Let(
                  {
                    shipDoc: q.Get(q.Var('shipRef')),
                  },
                  {
                    data: {
                      hatchIsOpen: true,
                    },
                  }
                )
              ),
              q.Create(q.Collection('ShipLogs'), {
                data: {
                  spaceshipRef: q.Var('shipRef'),
                  status: 'HATCH_OPENED',
                  pilotRef: q.CurrentIdentity(),
                },
              }),
              'Hatch open!'
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
