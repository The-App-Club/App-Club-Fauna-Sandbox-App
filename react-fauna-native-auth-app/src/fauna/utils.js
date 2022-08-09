import { q } from './config';

function CreateCollectionIfNotExists({ name }) {
  return q.If(
    q.Not(q.Exists(q.Collection(name))),
    q.CreateCollection({
      name,
    }),
    `Already exsist, skip create collection.`
  );
}

function CreateOrUpdateFunction({ name, body }) {
  return q.If(
    q.Exists(q.Function(name)),
    q.Update(q.Function(name), { body }),
    q.CreateFunction({ name, body })
  );
}

function CreateOrUpdateIndex({ name, source, terms, unique }) {
  return q.If(
    q.Exists(q.Index(name)),
    q.Update(q.Index(name), { source, terms, unique }),
    q.CreateIndex({ name, source, terms, unique })
  );
}

function CreateOrUpdateRole({ name, membership, privileges }) {
  return q.If(
    q.Exists(q.Role(name)),
    q.Update(q.Role(name), {
      membership: membership,
      privileges: privileges,
    }),
    q.CreateRole({ name, membership, privileges })
  );
}

export {
  CreateCollectionIfNotExists,
  CreateOrUpdateFunction,
  CreateOrUpdateIndex,
  CreateOrUpdateRole,
};
