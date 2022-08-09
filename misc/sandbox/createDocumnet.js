import {client, q} from './config';

(async () => {
  try {
    let response;

    // response = await client.query(
    //   q.Create(q.Collection('Pilots'), {
    //     data: {
    //       name: 'Flash Gordon',
    //     },
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Create(q.Collection('Spaceships'), {
    //     data: {
    //       name: 'Millennium Hawk',
    //       pilot: q.Ref(q.Collection('Pilots'), '326021348305404499'),
    //     },
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Create(q.Collection('Spaceships'), {
    //     data: {
    //       name: 'Voyager',
    //       pilot: q.Ref(q.Collection('Pilots'), '326021348305404499'),
    //     },
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Create(q.Collection('Posts'), {
    //     data: {title: 'What I had for breakfast ..'},
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Create(q.Ref(q.Collection('Posts'), '1'), {
    //     data: {title: 'The first post'},
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     [
    //       'Buck Rogers',
    //       'Flash Gordon',
    //       'Jean-Luc Picard',
    //     ],
    //     q.Lambda(
    //       'pilots',
    //       q.Create(q.Collection('Pilots'), {data: {name: q.Var('pilots')}})
    //     )
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     [
    //       {
    //         name: 'Jupiter',
    //         type: 'GAS',
    //       },
    //       {
    //         name: 'Saturn',
    //         type: 'GAS',
    //       },
    //       {
    //         name: 'Mercury',
    //         type: 'TERRESTRIAL',
    //       },
    //     ],
    //     q.Lambda('X', q.Create(q.Collection('Planets'), {data: q.Var('X')}))
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Create(q.Collection('Spaceships'), {
    //     data: {
    //       name: 'Rocinante',
    //       code: 'ROCINANTE',
    //     },
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Create(q.Collection('Spaceships'), {
    //     data: {
    //       name: 'Rocinante 2',
    //       code: 'ROCINANTE',
    //     },
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Create(q.Collection('Moons'), {
    //     data: {
    //       name: 'Luna',
    //       planetRef: q.Ref(q.Collection('Planets'), '326088991077040724'),
    //     },
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Create(q.Collection('Planets'), {
    //     data: {
    //       name: 'Earth',
    //       type: 'TERRESTRIAL',
    //       color: 'BLUE',
    //       moonRefs: [q.Ref(q.Collection('Moons'), '326089012658831956')],
    //     },
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Create(q.Collection('DockTechnicians'), {
    //     data: {name: 'Johnny Sparkles'},
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     [
    //       {
    //         name: 'Explorer IV',
    //         colors: ['BLUE', 'WHITE', 'RED'],
    //       },
    //       {
    //         name: 'Navigator',
    //         colors: ['WHITE', 'GREY'],
    //       },
    //       {
    //         name: 'Le Super Spaceship',
    //         colors: ['PINK', 'MAGENTA', 'WHITE'],
    //       },
    //     ],
    //     q.Lambda('X', q.Create(q.Collection('Spaceships'), {data: q.Var('X')}))
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Create(q.Collection('DockTechnicians'), {
    //     data: {name: 'Johnny Sparkles'},
    //   })
    // );
    // console.log(response);

    response = await client.query(
      q.Create(q.Collection('DockRepairs'), {
        data: {
          technicianRefs: [
            q.Ref(q.Collection('DockTechnicians'), '326091145926935122'),
          ],
          shipRef: q.Ref(q.Collection('Spaceships'), '326091074389934675'),
          status: 'PENDING',
        },
      })
    );

    console.log(response);

    // response = await client.query(
    //   q.Map(
    //     [
    //       'My cat and other marvels',
    //       'Pondering during a commute',
    //       'Deep meanings in a latte',
    //     ],
    //     q.Lambda(
    //       'post_title',
    //       q.Create(q.Collection('Posts'), {data: {title: q.Var('post_title')}})
    //     )
    //   )
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     [
    //       {
    //         name: 'apple',
    //         price: 300,
    //         qty: 10,
    //       },
    //       {
    //         name: 'banana',
    //         price: 100,
    //         qty: 11,
    //       },
    //       {
    //         name: 'orange',
    //         price: 200,
    //         qty: 12,
    //       },
    //     ],
    //     q.Lambda(
    //       'fruit',
    //       q.Create(q.Collection('test'), {data: q.Var('fruit')})
    //     )
    //   )
    // );

    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     [
    //       ['101', {letter: 'A', extra: 'First'}],
    //       ['102', {letter: 'B', extra: 'second'}],
    //       ['103', {letter: 'C', extra: 'third'}],
    //       ['104', {letter: 'D', extra: '4th'}],
    //       ['105', {letter: 'E', extra: 'fifth'}],
    //       ['106', {letter: 'F', extra: 'sixth'}],
    //       ['107', {letter: 'G', extra: 'seventh'}],
    //       ['108', {letter: 'H', extra: 'eighth'}],
    //       ['109', {letter: 'I', extra: '9th'}],
    //       ['110', {letter: 'J', extra: 'tenth'}],
    //       ['111', {letter: 'K', extra: 11}],
    //       ['112', {letter: 'L', extra: ''}],
    //       ['113', {letter: 'M'}],
    //       ['114', {letter: 'N', extra: '14th'}],
    //       ['115', {letter: 'O', extra: 'fifteenth'}],
    //       ['116', {letter: 'P', extra: '16th'}],
    //       ['117', {letter: 'Q', extra: 'seventeenth'}],
    //       ['118', {letter: 'R', extra: '18th'}],
    //       ['119', {letter: 'S', extra: '19th'}],
    //       ['120', {letter: 'T', extra: '20th'}],
    //       ['121', {letter: 'U', extra: '21st'}],
    //       ['122', {letter: 'V', extra: '22nd'}],
    //       ['123', {letter: 'W', extra: 'twenty-third'}],
    //       ['124', {letter: 'X', extra: 24}],
    //       ['125', {letter: 'Y', extra: '24 + 1'}],
    //       ['126', {letter: 'Z'}],
    //     ],
    //     q.Lambda(
    //       ['dID', 'data'],
    //       q.Create(q.Ref(q.Collection('Letters'), q.Var('dID')), {
    //         data: q.Var('data'),
    //       })
    //     )
    //   )
    // );

    // console.log(response);

    // response = await client.query(
    //   q.Map(
    //     [
    //       {
    //         first: 'Alan',
    //         last: 'Perlis',
    //         degrees: ['BA', 'MA', 'PhD'],
    //         letter: 'A',
    //       },
    //       {
    //         first: 'Alan',
    //         last: 'Turing',
    //         degrees: ['BA', 'MA', 'MS', 'PhD'],
    //         letter: 'B',
    //       },
    //       {
    //         first: 'Grace',
    //         last: 'Hopper',
    //         degrees: ['BA', 'MA', 'PhD'],
    //         letter: 'C',
    //       },
    //       {
    //         first: 'Leslie',
    //         last: 'Lamport',
    //         degrees: ['BS', 'MA', 'PhD'],
    //       },
    //       {
    //         first: 'Marvin',
    //         last: 'Minsky',
    //         degrees: ['BA', 'PhD'],
    //         letter: 1,
    //       },
    //       {
    //         first: 'Stephen',
    //         last: 'Cook',
    //         degrees: ['BS', 'PhD'],
    //         letter: 'F',
    //       },
    //       {
    //         first: 'Tim',
    //         last: 'Cook',
    //         degrees: ['BS', 'MBA'],
    //         letter: 'G',
    //       },
    //     ],
    //     q.Lambda(
    //       'person',
    //       q.Create(q.Collection('People'), {data: q.Var('person')})
    //     )
    //   )
    // );

    // console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
