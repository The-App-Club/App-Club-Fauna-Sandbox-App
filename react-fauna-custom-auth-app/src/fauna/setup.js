import {client, q} from './config';
const {
  CreateCollection,
  CreateIndex,
  Collection,
  Do,
  Exists,
  Not,
  If,
  Index,
  Update,
} = {...q};

function CreateCollectionIfNotExists({name, ttl_days}) {
  return q.If(
    Not(Exists(Collection(name))),
    CreateCollection({
      name,
      ttl_days,
    }),
    `Already exsist, skip create collection.`
  );
}

function CreateOrUpdateIndex({name, source, terms, values, unique}) {
  return If(
    Exists(Index(name)),
    Update(Index(name), {source, terms, values, unique}),
    CreateIndex({name, source, terms, values, unique})
  );
}

(async () => {
  try {
    let response;
    response = await client.query(
      Do(
        CreateCollectionIfNotExists({name: 'accounts'}),
        CreateCollectionIfNotExists({name: 'login_tokens'}),
        CreateCollectionIfNotExists({name: 'signup_tokens'})
      )
    );
    response = await client.query(
      Do(
        CreateOrUpdateIndex({
          name: 'unique_emails',
          source: Collection('accounts'),
          terms: [{field: ['data', 'email']}],
          unique: true,
        }),
        CreateOrUpdateIndex({
          name: 'accounts_by_email',
          source: Collection('accounts'),
          terms: [{field: ['data', 'email']}],
          unique: true,
        }),
        CreateOrUpdateIndex({
          name: 'login_tokens_by_hash',
          source: Collection('login_tokens'),
          terms: [{field: ['data', 'token_hash']}],
        }),
        CreateOrUpdateIndex({
          name: 'login_tokens_by_account_id',
          source: Collection('login_tokens'),
          terms: [{field: ['data', 'account_id']}],
        }),
        CreateOrUpdateIndex({
          name: 'signup_tokens_by_hash',
          source: Collection('signup_tokens'),
          terms: [{field: ['data', 'token_hash']}],
        }),
        CreateOrUpdateIndex({
          name: 'signup_tokens_by_account_id',
          source: Collection('signup_tokens'),
          terms: [{field: ['data', 'account_id']}],
        })
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
