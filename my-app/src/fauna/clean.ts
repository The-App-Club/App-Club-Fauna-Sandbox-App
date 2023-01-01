import { FaunaDBClient, FaunaDBQueryManager, q } from '@/fauna/config'

const deleteAllCollections = async ({ client }: { client: FaunaDBClient }) => {
  return await client.query(
    q.Map(q.Paginate(q.Collections()), q.Lambda('ref', q.Delete(q.Var('ref'))))
  )
}

const deleteAllFunctions = async ({ client }: { client: FaunaDBClient }) => {
  return await client.query(
    q.Map(q.Paginate(q.Functions()), q.Lambda('ref', q.Delete(q.Var('ref'))))
  )
}

const deleteAllIndexes = async ({ client }: { client: FaunaDBClient }) => {
  return await client.query(
    q.Map(q.Paginate(q.Indexes()), q.Lambda('ref', q.Delete(q.Var('ref'))))
  )
}

const deleteAllRoles = async ({ client }: { client: FaunaDBClient }) => {
  return await client.query(
    q.Map(q.Paginate(q.Roles()), q.Lambda('ref', q.Delete(q.Var('ref'))))
  )
}

const clean = ({ client }: { client: FaunaDBClient }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteAllCollections({ client })
      await deleteAllFunctions({ client })
      await deleteAllIndexes({ client })
      await deleteAllRoles({ client })
      resolve(null)
    } catch (error) {
      reject(error)
    }
  })
}

const doClean = async () => {
  let client = new FaunaDBQueryManager().getClient()
  await clean({ client })
}

export { doClean }
