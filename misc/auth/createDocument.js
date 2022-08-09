import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(
    //   q.Create(q.Collection('users'), {
    //     credentials: {password: 'secret password'},
    //     data: {
    //       email: 'alice@site.example',
    //     },
    //   })
    // );
    // response = await client.query(
    //   q.Create(q.Collection('SpaceUsers'), {
    //     data: {
    //       email: 'darth@empire.com',
    //     },
    //     credentials: {
    //       password: 'iamyourfather',
    //     },
    //   })
    // );
    // console.log(response);
    // response = await client.query(
    //   q.Create(q.Collection('SpaceUsers'), {
    //     data: {
    //       email: 'yoda@jedi.com',
    //     },
    //     credentials: {
    //       password: 'thereisnotry',
    //     },
    //   })
    // );
    // console.log(response);

    response = await client.query(
      q.Create(q.Collection('SpaceUsers'), {
        data: {
          email: 'han@solo.com',
          isPilot: true,
        },
        credentials: {
          password: 'dontgetcocky',
        },
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
