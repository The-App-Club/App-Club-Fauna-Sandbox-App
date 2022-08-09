import {client, q} from './config';
import {v4 as uuid} from 'uuid';
const {
  Let,
  Match,
  Index,
  Var,
  Not,
  Exists,
  If,
  Do,
  Create,
  Collection,
  TimeAdd,
  Now,
  Get,
  Select,
} = {...q};

function niceMagic({
  email = 'bob@example.com',
  hashedSomething = 'hash-of-the-random-token-we-generated',
}) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await client.query(
        Let(
          {
            token_hash: hashedSomething,
            email: email,
            account_match: Match(Index('accounts_by_email'), Var('email')),
            account_is_new: Not(Exists(Var('account_match'))),
            account_id: uuid(),
          },
          If(
            Var('account_is_new'),
            Do(
              // In case it does not exist
              Create(
                // Store signup token for new account
                // 8時間は email verify までの期間を考慮している
                Collection('signup_tokens'),
                {
                  data: {
                    token_hash: Var('token_hash'),
                    email: Var('email'),
                    expires_at: TimeAdd(Now(), 5, 'minutes'),
                    account_id: Var('account_id'),
                  },
                }
              ),
              Create(Collection('accounts'), {
                data: {
                  email: Var('email'),
                  account_id: Var('account_id'),
                },
              }),
              'signup'
            ),
            Do(
              // In case a user exists with this e-mail
              Create(
                // Store token for existing account
                Collection('login_tokens'),
                {
                  data: {
                    token_hash: Var('token_hash'),
                    email: Var('email'),
                    account_ref: Var('account_match'),
                    used: false,
                    expires_at: TimeAdd(Now(), 10, 'minutes'),
                    account_id: Select(
                      ['data', 'account_id'],
                      Get(Match(Index('accounts_by_email'), Var('email')))
                    ),
                  },
                }
              ),
              'login'
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

export {niceMagic};
