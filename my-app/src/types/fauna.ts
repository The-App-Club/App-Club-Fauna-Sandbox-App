import { FaunaDBClient, StreamClient } from '@/fauna/config'

export type FaunaManager = {
  client: FaunaDBClient | null
  streamClient: Map<string, StreamClient> | null
}
