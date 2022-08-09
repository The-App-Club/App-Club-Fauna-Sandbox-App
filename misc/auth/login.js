import {client, q} from './config';

(async () => {
  try {
    let response;
    // response = await client.query(
    //   q.Login(q.Match(q.Index('users_by_email'), 'alice@site.example'), {
    //     password: 'new password',
    //   })
    // );
    // console.log(response);
    // response = await client.query(
    //   q.Login(q.Match(q.Index('users_by_email'), 'bob@not.a.member'), {
    //     password: 'secret password',
    //   })
    // );
    // console.log(response);
    response = await client.query(
      q.Login(q.Match(q.Index('SpaceUsers_by_email'), 'darth@empire.com'), {
        password: 'iamyourfather',
        ttl: q.TimeAdd(q.Now(), 3, 'hour'),
      })
    );
    console.log(response);

    // response = await client.query(
    //   q.Login(q.Match(q.Index('SpaceUsers_by_email'), 'darth@empire.com'), {
    //     password: 'darksidemaster',
    //   })
    // );
    // console.log(response);

    // response = await client.query(
    //   q.Login(q.Match(q.Index('SpaceUsers_by_email'), 'han@solo.com'), {
    //     password: 'dontgetcocky',
    //   })
    // );
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
})();

// $ yarn kick login.js
// yarn run v1.22.17
// warning package.json: No license field
// $ node -r esm login.js
// {
//   ref: Ref(Tokens(), "326112389164434003"),
//   ts: 1647263859850000,
//   instance: Ref(Collection("users"), "326112328640627282"),
//   secret: 'fnEEhpV9eQACUwSGNHYEkApT0m4uxtEwNFrka3CRB79KnYecGvI'
// }
// Done in 1.60s.
