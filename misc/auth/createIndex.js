import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'users_by_email',
    //     permissions: {read: 'public'},
    //     source: q.Collection('users'),
    //     terms: [{field: ['data', 'email']}],
    //     unique: true,
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'tokens_by_instance',
    //     permissions: {read: 'public'},
    //     source: q.Tokens(),
    //     terms: [{field: 'instance'}],
    //     values: [{field: ['data', 'name']}],
    //   })
    // );
    // console.log(response);

    response = await client.query(
      q.CreateIndex({
        name: 'SpaceUsers_by_email',
        source: q.Collection('SpaceUsers'),
        terms: [{field: ['data', 'email']}],
        unique: true,
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
