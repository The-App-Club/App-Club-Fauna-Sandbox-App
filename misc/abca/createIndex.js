import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_users',
    //     source: q.Collection('users'),
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'user_by_name',
    //     source: q.Collection('users'),
    //     terms: [{field: ['data', 'name']}],
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.CreateIndex({
    //     name: 'all_salaries',
    //     source: q.Collection('salary'),
    //   })
    // );
    // console.log(response);

    response = await client.query(
      q.CreateIndex({
        name: 'is_subordinate',
        source: q.Collection('user_subordinate'),
        terms: [{field: ['data', 'user']}, {field: ['data', 'reports_to']}],
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
