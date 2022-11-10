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
  Role,
  CreateRole,
} = {...q};

function CreateOrUpdateIndex({name, source, terms, values, unique}) {
  return If(
    Exists(Index(name)),
    Update(Index(name), {source, terms, values, unique}),
    CreateIndex({name, source, terms, values, unique})
  );
}

function CreateOrUpdateRole({name, membership, privileges}) {
  return If(
    Exists(Role(name)),
    Update(Role(name), {
      membership: membership,
      privileges: privileges,
    }),
    CreateRole({name, membership, privileges})
  );
}

(async () => {
  try {
    let response;
    response = await client.query(
      CreateOrUpdateIndex({
        name: 'user_by_email',
        unique: true,
        serialized: true,
        source: Collection('User'),
        terms: [{field: ['data', 'email'], transform: 'casefold'}],
      })
    );
    console.log(response);

    response = await client.query(
      CreateOrUpdateRole({
        name: 'MyCustomRole',
        privileges: [
          {
            resource: Collection('Todo'),
            actions: {
              read: true,
              write: true,
              create: true,
              delete: true,
              history_read: true,
              history_write: true,
              unrestricted_read: false,
            },
          },
          {
            resource: Index('todo_owner_by_user'),
            actions: {
              unrestricted_read: false,
              read: true,
            },
          },
          {
            resource: Index('allTodos'),
            actions: {
              unrestricted_read: false,
              read: true,
            },
          },
          {
            resource: Collection('User'),
            actions: {
              read: true,
              write: true,
              create: false,
              delete: false,
              history_read: false,
              history_write: false,
              unrestricted_read: false,
            },
          },
        ],
        membership: [
          {
            resource: Collection('User'),
          },
        ],
      })
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
