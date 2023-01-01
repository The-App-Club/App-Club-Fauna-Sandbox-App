import { ExprArg, q } from '@/fauna/config'

const CreateCollectionIfNotExists = ({ name }: { name: ExprArg }) => {
  return q.If(
    q.Not(q.Exists(q.Collection(name))),
    q.CreateCollection({
      name,
    }),
    `Already exsist, skip create collection.`
  )
}

const CreateOrUpdateFunction = ({
  name,
  body,
}: {
  name: ExprArg
  body: ExprArg
}) => {
  return q.If(
    q.Exists(q.Function(name)),
    q.Update(q.Function(name), { body }),
    q.CreateFunction({ name, body })
  )
}

const CreateOrUpdateIndex = ({
  name,
  source,
  terms,
  unique,
}: {
  name: ExprArg
  source: ExprArg
  terms: ExprArg
  unique: ExprArg
}) => {
  return q.If(
    q.Exists(q.Index(name)),
    q.Update(q.Index(name), { source, terms, unique }),
    q.CreateIndex({ name, source, terms, unique })
  )
}

const CreateOrUpdateRole = ({
  name,
  membership,
  privileges,
}: {
  name: ExprArg
  membership: ExprArg
  privileges: ExprArg
}) => {
  return q.If(
    q.Exists(q.Role(name)),
    q.Update(q.Role(name), {
      membership: membership,
      privileges: privileges,
    }),
    q.CreateRole({ name, membership, privileges })
  )
}

export {
  CreateCollectionIfNotExists,
  CreateOrUpdateFunction,
  CreateOrUpdateIndex,
  CreateOrUpdateRole,
}
