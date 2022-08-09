import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(
    //   q.Login(q.Match(q.Index('user_by_name'), 'Bob'), {password: '123'})
    // );
    // console.log(response);

    response = await client.query(
      q.Login(q.Match(q.Index('user_by_name'), 'Mary'), {password: '123'})
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
