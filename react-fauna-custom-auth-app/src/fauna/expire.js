import {client, q} from './config';
const {Let, Match, Index, Var, Exists, If, Get, Now, Select, TimeDiff, GT} = {
  ...q,
};

function cleanExpiredLoginToken({accountId}) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await client.query(
        Let(
          {
            account_id: accountId,
            token_match: Match(
              Index('login_tokens_by_account_id'),
              Var('account_id')
            ),
            token: If(
              Exists(Var('token_match')),
              Get(Var('token_match')),
              null
            ),
            token_list: q.Paginate(q.Var('token_match')),
            checked_token_list: q.Map(
              q.Var('token_list'),
              q.Lambda('X', {
                is_expired: GT(
                  TimeDiff(
                    Select(['data', 'expires_at'], q.Get(Var('X'))),
                    Now(),
                    'seconds'
                  ),
                  0
                ),
                account_id: Select(['data', 'account_id'], q.Get(Var('X'))),
                ref: Var('X'),
              })
            ),
          },
          q.Map(
            q.Var('checked_token_list'),
            q.Lambda(
              'Y',
              q.If(
                q.Select(['is_expired'], q.Var('Y')),
                q.Delete(q.Select(['ref'], q.Var('Y'))),
                `not expired`
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

export {cleanExpiredLoginToken};
