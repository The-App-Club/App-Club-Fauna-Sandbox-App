import {client, q} from './config';

(async () => {
  try {
    let response;
    // https://docs.fauna.com/fauna/current/tutorials/basics/functions?lang=javascript#do
    // response = await client.query(
    //   q.Do(
    //     // first create a document
    //     q.Create(q.Ref(q.Collection('LaserColors'), '123456'), {
    //       data: {
    //         name: 'Pink',
    //       },
    //     }),
    //     // then update that same document
    //     q.Update(q.Ref(q.Collection('LaserColors'), '123456'), {
    //       data: {
    //         hex: '#ff5c9e',
    //       },
    //     })
    //   )
    // );
    // console.log(response);

    response = await client.query(
      q.Do('Step 1', 'Step 2', q.Abort('You shall not pass!'), 'Step 3')
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
