import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Map(
        ['Desktop App', 'Mobile App', 'Web Service'],
        q.Lambda(
          'service',
          q.Login(q.Match(q.Index('users_by_email'), 'alice@site.example'), {
            password: 'new password',
            data: {name: q.Var('service')},
          })
        )
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
