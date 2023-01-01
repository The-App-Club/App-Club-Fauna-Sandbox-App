import { useCallback, useMemo } from 'react'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import { q, StreamClient } from '@/fauna/config'
import { faunaState } from '@/stores/fauna'

const useFauna = (collectionName?: string) => {
  const activeFauna = useRecoilValue(faunaState)
  const setActiveFauna = useSetRecoilState(faunaState)
  const { client } = useMemo(() => {
    return { ...activeFauna }
  }, [activeFauna])

  const subscribe = useCallback(
    (id?: string) => {
      if (!collectionName) {
        return
      }
      if (client) {
        if (activeFauna.streamClient?.has(collectionName)) {
          activeFauna.streamClient.get(collectionName)?.close()
        }
        const watchedObject = id
          ? q.Ref(q.Collection(collectionName), id)
          : q.Documents(q.Collection(collectionName))
        const streamClient = client
          .stream(watchedObject)
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

        if (id) {
          setActiveFauna((prevState) => {
            const map = new Map<string, StreamClient>()
            map.set(`${collectionName}-${id}`, streamClient)
            return {
              ...prevState,
              streamClient: map,
            }
          })
        } else {
          setActiveFauna((prevState) => {
            const map = new Map<string, StreamClient>()
            map.set(collectionName, streamClient)
            return {
              ...prevState,
              streamClient: map,
            }
          })
        }
      }
    },
    [client, activeFauna, setActiveFauna, collectionName]
  )

  const unsubscribe = useCallback(
    (id?: string) => {
      if (!collectionName) {
        return
      }
      if (id) {
        if (activeFauna.streamClient?.has(`${collectionName}-${id}`)) {
          activeFauna.streamClient.get(`${collectionName}-${id}`)?.close()
        }
      } else {
        if (activeFauna.streamClient?.has(collectionName)) {
          activeFauna.streamClient.get(collectionName)?.close()
        }
      }
    },
    [activeFauna, collectionName]
  )

  return {
    setActiveFauna,
    activeFauna,
    client,
    subscribe,
    unsubscribe,
  }
}

export default useFauna
