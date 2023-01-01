import { useCallback, useMemo } from 'react'

import { Subscription, SubscriptionEventHandlers } from 'faunadb'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { q } from '@/fauna/config'
import { faunaState } from '@/stores/fauna'

const useFauna = (collectionName?: string) => {
  const activeFauna = useRecoilValue(faunaState)
  const setActiveFauna = useSetRecoilState(faunaState)
  const { client } = useMemo(() => {
    return { ...activeFauna }
  }, [activeFauna])

  const subscribe = useCallback(() => {
    if (!collectionName) {
      return
    }
    if (client) {
      if (activeFauna.streamClient?.has(collectionName)) {
        activeFauna.streamClient.get(collectionName)?.close()
      }
      const streamClient = client
        .stream(q.Documents(q.Collection(collectionName)))
        .on('start', (e) => {
          console.log('[start]', e)
        })
        .on('set', (e) => {
          console.log('[set]', e)
        })
        .on('error', (e) => {
          console.log('[error]', e)
        })
        .on('history_rewrite', (e) => {
          console.log('[history_rewrite]', e)
        })
        .on('version', (e) => {
          console.log(`[version]`, e)
        })
      streamClient.start()
      setActiveFauna((prevState) => {
        const map = new Map<
          string,
          Subscription<Omit<SubscriptionEventHandlers, 'snapshot'>> | null
        >()
        map.set(collectionName, streamClient)
        return {
          ...prevState,
          streamClient: map,
        }
      })
    }
  }, [client, activeFauna, setActiveFauna, collectionName])

  const unsubscribe = useCallback(() => {
    if (!collectionName) {
      return
    }
    if (activeFauna.streamClient?.has(collectionName)) {
      activeFauna.streamClient.get(collectionName)?.close()
    }
  }, [activeFauna, collectionName])

  return {
    setActiveFauna,
    activeFauna,
    client,
    subscribe,
    unsubscribe,
  }
}

export default useFauna
