import {client, q} from './config';

(async () => {
  try {
    let response;

    // response = await client.query(
    //   q.Update(q.Ref(q.Collection('DockTechnicians'), '326091145926935122'), {
    //     data: {
    //       workingOn: [q.Ref(q.Collection('Spaceships'), '326091074389934675')],
    //     },
    //   })
    // );

    // console.log(response);

    // response = await client.query(
    //   q.Update(q.Ref(q.Collection('DockRepairs'), '326091523885105746'), {
    //     data: {
    //       startTimestamp: q.Time('2355-02-11T05:23:11Z'),
    //       status: 'IN_PROCESS',
    //     },
    //   })
    // );

    // response = await client.query(
    //   q.Update(q.Ref(q.Collection('DockRepairs'), '326091523885105746'), {
    //     data: {
    //       endTimestamp: q.Time('2355-02-11T03:05:35Z'),
    //       status: 'DONE',
    //     },
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Update(q.Ref(q.Collection('Spaceships'), '326021417273393748'), {
    //     data: {
    //       name: 'Millennium Falcon',
    //     },
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Update(q.Ref(q.Collection('Posts'), '1'), {
    //     data: {tags: ['welcome', 'short']},
    //   })
    // );

    // console.log(response);

    // response = await client.query(
    //   q.Replace(q.Ref(q.Collection('Posts'), '1'), {
    //     data: {title: 'The replacement first post'},
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Update(q.Ref(q.Collection('Spaceships'), '326079590450594387'), {
    //     data: {
    //       colors: ['RED', 'YELLOW'],
    //   })
    //     },
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Update(
    //     q.Ref(q.Collection('Planets'), '326078968998396500'),
    //     // NOTE: be sure to use your planet's document ID here
    //     {data: {color: 'BLUE'}}
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Update(
    //     q.Ref(q.Collection('Planets'), '326079018072801874'),
    //     // NOTE: be sure to use your planet's document ID here
    //     {data: {color: 'GREY'}}
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Update(
    //     q.Ref(q.Collection('Planets'), '326080807239156307'),
    //     // NOTE: be sure to use your planet's document ID here
    //     {data: {color: 'BLUE'}}
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Update(
    //     q.Ref(q.Collection('Planets'), '326080807240205907'),
    //     // NOTE: be sure to use your planet's document ID here
    //     {data: {color: 'RED'}}
    //   )
    // );
    // console.log(response);

    response = await client.query(
      q.Update(q.Ref(q.Collection('Spaceships'), '326091074389934675'), {
        data: {
          type: 'Rocket',
          fuelType: 'Plasma',
          actualFuelTons: 111,
          maxFuelTons: 10,
          maxCargoTons: 25,
          maxPassengers: 5,
          maxRangeLightyears: 10,
          position: {
            x: 2234,
            y: 3453,
            z: 9805,
          },
        },
      })
    );
    console.log(response);

    response = await client.query(
      q.Update(q.Ref(q.Collection('Spaceships'), '326091074390983251'), {
        data: {
          type: 'Rocket',
          fuelType: 'Plasma',
          actualFuelTons: 27,
          maxFuelTons: 20,
          maxCargoTons: 25,
          maxPassengers: 5,
          maxRangeLightyears: 10,
          position: {
            x: 2234,
            y: 3453,
            z: 9805,
          },
        },
      })
    );
    console.log(response);

    response = await client.query(
      q.Update(q.Ref(q.Collection('Spaceships'), '326091074390984275'), {
        data: {
          type: 'Rocket',
          fuelType: 'Plasma',
          actualFuelTons: 37,
          maxFuelTons: 20,
          maxCargoTons: 25,
          maxPassengers: 5,
          maxRangeLightyears: 10,
          position: {
            x: 2234,
            y: 3453,
            z: 9805,
          },
        },
      })
    );
    console.log(response);

    // response = await client.query(
    //   q.Update(q.Ref(q.Collection('Spaceships'), '326081387876581971'), {
    //     data: {
    //       type: 'Rocket',
    //       fuelType: 'Plasma',
    //       actualFuelTons: 137,
    //       maxFuelTons: 120,
    //       maxCargoTons: 25,
    //       maxPassengers: 5,
    //       maxRangeLightyears: 10,
    //       position: {
    //         x: 2234,
    //         y: 3453,
    //         z: 9805,
    //       },
    //     },
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Update(q.Ref(q.Collection('Spaceships'), '326021725778084434'), {
    //     data: {
    //       type: 'Rocket',
    //       fuelType: 'Plasma',
    //       actualFuelTons: 7,
    //       maxFuelTons: 10,
    //       maxCargoTons: 25,
    //       maxPassengers: 5,
    //       maxRangeLightyears: 10,
    //       position: {
    //         x: 2234,
    //         y: 3453,
    //         z: 9805,
    //       },
    //     },
    //   })
    // );

    // console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
