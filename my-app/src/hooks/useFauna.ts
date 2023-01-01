import { useCallback, useMemo } from 'react'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import { q } from '@/fauna/config'
import { faunaState } from '@/stores/fauna'

const useFauna = () => {
  const activeFauna = useRecoilValue(faunaState)
  const setActiveFauna = useSetRecoilState(faunaState)
  const { client } = useMemo(() => {
    return { ...activeFauna }
  }, [activeFauna])

  const subscribe = useCallback(
    (collectionName: string) => {
      if (client) {
        if (activeFauna.streamClient) {
          activeFauna.streamClient.close()
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
          return {
            ...prevState,
            streamClient,
          }
        })
      }
    },
    [client, activeFauna, setActiveFauna]
  )

  const unsubscribe = useCallback(() => {
    if (activeFauna.streamClient) {
      activeFauna.streamClient.close()
    }
  }, [activeFauna])

  return {
    setActiveFauna,
    activeFauna,
    client,
    subscribe,
    unsubscribe,
  }
}

export default useFauna
