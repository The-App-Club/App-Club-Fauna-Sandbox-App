import {client, q} from './config';
const {Let, Match, Index, Var, Exists, If, Get} = {...q};

function logout({accountId}) {
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
          },
          q.Map(q.Var('token_list'), q.Lambda('X', q.Delete(q.Var('X'))))
        )
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export {logout};
