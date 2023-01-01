import faunadb, { Subscription, SubscriptionEventHandlers } from 'faunadb'

import { env } from '@/config/env'

const q = faunadb.query

export type ExprArg = faunadb.ExprArg
export type FaunaDBClient = faunadb.Client
export type StreamClient = Subscription<
  Omit<SubscriptionEventHandlers, 'snapshot'>
> | null

class FaunaDBQueryManager {
  private client: FaunaDBClient

  constructor(clientConfig?: faunadb.ClientConfig) {
    const neatSecret = clientConfig?.secret || env.NEXT_PUBLIC_FAUNADB_SECRET
    this.client = new faunadb.Client({
      secret: neatSecret,
      domain: 'db.fauna.com',
      // NOTE: Use the correct domain for your database's Region Group.
      port: 443,
      scheme: 'https',
    })
  }

  getClient() {
    return this.client
  }
}

export { q, FaunaDBQueryManager }
