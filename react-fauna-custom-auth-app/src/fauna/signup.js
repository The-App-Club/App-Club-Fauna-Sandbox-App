import {client, q} from './config';
const {
  Let,
  Match,
  Index,
  Var,
  Exists,
  If,
  Get,
  Now,
  Select,
  TimeDiff,
  GT,
  IsNull,
} = {...q};

function signup({hashedSomething = 'hash-of-the-random-token-we-generated'}) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await client.query(
        Let(
          {
            token_hash: hashedSomething,
            token_match: Match(
              Index('signup_tokens_by_hash'),
              Var('token_hash')
            ),
            token: If(
              Exists(Var('token_match')),
              Get(Var('token_match')),
              null
            ),
          },
          If(
            IsNull(Var('token')), // Hash not found?
            {status: 'invalid'},
            If(
              // email verify までの期間を考慮している
              GT(
                TimeDiff(
                  Select(['data', 'expires_at'], Var('token')),
                  Now(),
                  'seconds'
                ),
                0
              ), // Expired?
              {
                status: 'expired',
                account_id: Select(['data', 'account_id'], Var('token')),
              },
              {
                status: 'used',
                account_id: Select(['data', 'account_id'], Var('token')),
              }
            )
          )
        )
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export {signup};
