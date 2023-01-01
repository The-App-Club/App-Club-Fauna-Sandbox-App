import { Subscription, SubscriptionEventHandlers } from 'faunadb'

import { FaunaDBClient } from '@/fauna/config'

export type FaunaManager = {
  client: FaunaDBClient | null
  streamClient: Map<
    string,
    Subscription<Omit<SubscriptionEventHandlers, 'snapshot'>> | null
  > | null
}
