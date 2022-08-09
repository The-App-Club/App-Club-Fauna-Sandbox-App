import {client, q} from './config';
const {
  Let,
  Match,
  Index,
  Var,
  Get,
  Exists,
  If,
  Do,
  IsNull,
  TimeDiff,
  Now,
  Select,
  Update,
  GT,
} = {...q};

function login({hashedSomething = 'hash-of-the-random-token-we-generated'}) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await client.query(
        Let(
          {
            token_hash: hashedSomething,
            token_match: Match(
              Index('login_tokens_by_hash'),
              Var('token_hash')
            ),
            token: If(
              Exists(Var('token_match')),
              Get(Var('token_match')),
              null
            ),
          },
          If(
            IsNull(Var('token')), // Token not found?
            {status: 'invalid'},
            If(
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
              If(
                Select(['data', 'used'], Var('token')), // Used?
                {
                  status: 'used',
                  account_id: Select(['data', 'account_id'], Var('token')),
                },
                Do(
                  // Valid token
                  Update(Select('ref', Var('token')), {data: {used: true}}), // Set as used
                  {
                    status: 'used',
                    account_id: Select(['data', 'account_id'], Var('token')),
                  } // Return value
                )
              )
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

export {login};
