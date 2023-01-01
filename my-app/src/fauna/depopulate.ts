import { FaunaDBQueryManager } from '@/fauna/config'

const doDelete = async () => {
  const client = new FaunaDBQueryManager().getClient()

  return client
}

export { doDelete }
