import { useQuery } from '@tanstack/react-query'

import { factory } from '@/features/film/facotry'
import { FILM_COLLECTION_HISTORY_LOAD_MORE_KEY } from '@/features/film/types'
import { ErrorData } from '@/types/error'
import { Cursor, FaunaBackendCollectionHistoryResponse } from '@/types/response'

const filmFactory = factory.filmFactory()

const useHistoryCollectionLoadMoreHook = ({
  collectionName,
  size = 10,
  afterCursor,
}: {
  collectionName: string
  size: number
  afterCursor?: Cursor
}) => {
  const { data, error, refetch } = useQuery<
    {
      data: FaunaBackendCollectionHistoryResponse[]
      after: Cursor
    },
    ErrorData
  >(
    [
      FILM_COLLECTION_HISTORY_LOAD_MORE_KEY,
      collectionName,
      size,
      { afterCursor },
    ],
    async () =>
      await filmFactory.historyCollectionLoadMore({
        collectionName,
        size,
        afterCursor,
      }),
    {
      onSuccess: function (data) {
        // console.log(`onSuccess`)
      },
      onError: function (error) {
        console.log(`onError`, error)
      },
      onSettled: function (data, error) {
        // console.log(`onSettled`)
      },
    }
  )
  return { data, error, refetch }
}

export default useHistoryCollectionLoadMoreHook
