import { FaunaDBQueryManager, q } from './config';
import {
  CreateCollectionIfNotExists,
  CreateOrUpdateFunction,
  CreateOrUpdateIndex,
  CreateOrUpdateRole,
} from './utils';

// https://docs.fauna.com/fauna/current/security/abac
// https://docs.fauna.com/fauna/current/learn/tutorials/fql/authentication/abac#step-9-create-a-role-that-provides-the-appropriate-privileges

// 設定上はread/deleteしか自身のデータのみの制限は加えられないが
// 実行時には自身のデータのみハンドリングできるようにふるまってくれる（update/delete）
const OnlyMySelf = () => {
  return q.Query(
    q.Lambda(
      'docRef',
      q.Let(
        {
          doc: q.Get(q.Var('docRef')),
          userRef: q.Select(['data', 'user'], q.Var('doc')),
        },
        q.Or(q.Equals(q.Var('userRef'), q.CurrentIdentity()))
      )
    )
  );
};

(async () => {
  try {
    let client = new FaunaDBQueryManager({}).client;
    let response;
    response = await client.query(
      q.Do(
        CreateCollectionIfNotExists({ name: 'accounts' }),
        CreateCollectionIfNotExists({ name: 'fruits' })
      )
    );
    console.log(response);
    response = await client.query(
      q.Do(
        CreateOrUpdateIndex({
          name: 'accounts_by_email',
          source: q.Collection('accounts'),
          terms: [
            {
              field: ['data', 'email'],
            },
          ],
          unique: true,
        }),
        CreateOrUpdateIndex({
          name: 'fruits_by_name',
          source: q.Collection('fruits'),
          terms: [
            {
              field: ['data', 'name'],
            },
          ],
          unique: true,
        })
      )
    );
    console.log(response);
    response = await client.query(
      CreateOrUpdateFunction({
        name: `create_fruits`,
        body: q.Query(
          q.Lambda(
            ['name'],
            q.Create(q.Collection('fruits'), {
              data: {
                name: q.Var('name'),
                user: q.CurrentIdentity(),
              },
            })
          )
        ),
      })
    );
    console.log(response);
    response = await client.query(
      CreateOrUpdateFunction({
        name: `delete_fruits`,
        body: q.Query(
          q.Lambda(
            [],
            q.Map(
              q.Paginate(q.Documents(q.Collection('fruits'))),
              q.Lambda('X', q.Delete(q.Var('X')))
            )
          )
        ),
      })
    );
    console.log(response);

    response = await client.query(
      CreateOrUpdateFunction({
        name: `select_fruits`,
        body: q.Query(
          q.Lambda(
            ['name'],
            q.Map(
              q.Paginate(q.Documents(q.Collection('fruits'))),
              q.Lambda('X', q.Get(q.Var('X')))
            )
          )
        ),
      })
    );
    console.log(response);
    response = await client.query(
      CreateOrUpdateFunction({
        name: `update_fruits`,
        body: q.Query(
          q.Lambda(
            ['prefix'],
            q.Map(
              q.Paginate(q.Documents(q.Collection('fruits'))),
              q.Lambda(
                'X',
                q.Let(
                  {
                    oldName: q.Select(['data', 'name'], q.Get(q.Var('X'))),
                    newName: q.Concat([q.Var('prefix'), q.Var('oldName')], '_'),
                  },
                  q.Update(q.Var('X'), {
                    data: {
                      name: q.Var('newName'),
                    },
                  })
                )
              )
            )
          )
        ),
      })
    );
    console.log(response);
    response = await client.query(
      CreateOrUpdateRole({
        name: 'fruits_role',
        membership: [
          {
            resource: q.Collection('accounts'),
          },
        ],
        privileges: [
          {
            resource: q.Collection('fruits'),
            actions: {
              create: true,
              delete: OnlyMySelf(),
              read: OnlyMySelf(),
              write: true,
              history_read: true,
              history_write: true,
            },
          },
          {
            resource: q.Function('create_fruits'),
            actions: {
              call: true,
            },
          },
          {
            resource: q.Function('select_fruits'),
            actions: {
              call: true,
            },
          },
          {
            resource: q.Function('update_fruits'),
            actions: {
              call: true,
            },
          },
          {
            resource: q.Function('delete_fruits'),
            actions: {
              call: true,
            },
          },
          // {
          //   // 所有者を問わず共有したいリソースに対する権限付与 public
          //   resource: q.Collection('fruits'),
          //   actions: {
          //     read: true,
          //   },
          // },
        ],
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
