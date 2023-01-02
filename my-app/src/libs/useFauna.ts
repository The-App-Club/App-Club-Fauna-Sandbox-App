import { useCallback, useMemo } from 'react'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import { q, StreamClient } from '@/fauna/config'
import { factory } from '@/features/film/facotry'
import { FilmData } from '@/features/film/types'
import useToast from '@/libs/useToast'
import { faunaState } from '@/stores/fauna'
import {
  FaunaBackendMetaResponse,
  FaunaBackendResponse,
} from '@/types/response'

const filmFactory = factory.filmFactory()

const useFauna = (collectionName?: string) => {
  const { successToast, errorToast } = useToast()
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
          .on('set', async (e) => {
            const { action, document } = e as {
              action: 'add' | 'remove'
              document?: FaunaBackendMetaResponse
              index?: object | undefined
            }

            if (!document) {
              return
            }

            console.log('[set]', e)

            const response = await filmFactory.historyCollection({
              collectionName,
            })

            console.log(response)
          })
          .on('error', (e) => {
            console.log('[error]', e)
          })
          .on('history_rewrite', (e) => {
            console.log('[history_rewrite]', e)
          })
          .on('version', async (e) => {
            // https://fauna.com/blog/core-fql-concepts-part-2-temporality-in-faunadb
            const { action, document } = e as {
              action: 'create' | 'update' | 'delete'
              document?: FaunaBackendResponse<FilmData>
              diff?: object | undefined
              prev?: object | undefined
            }

            if (!document) {
              return
            }
            console.log(`[version]`, e)
            const response = await filmFactory.historyDocument({
              collectionName,
              documentId: document.ref.value.id,
            })
            console.log(action, response)
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
