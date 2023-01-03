import { useQuery } from '@tanstack/react-query'

import { factory } from '@/features/film/facotry'
import { FILM_COLLECTION_HISTORY_KEY } from '@/features/film/types'
import { ErrorData } from '@/types/error'
import { Cursor, FaunaBackendCollectionHistoryResponse } from '@/types/response'

const filmFactory = factory.filmFactory()

const useHistoryCollectionPaginationHook = ({
  collectionName,
  size = 10,
  beforeCursor,
  afterCursor,
}: {
  collectionName: string
  size: number
  beforeCursor?: Cursor
  afterCursor?: Cursor
}) => {
  const { data, error, refetch } = useQuery<
    {
      before: Cursor
      data: FaunaBackendCollectionHistoryResponse[]
      after: Cursor
    },
    ErrorData
  >(
    [
      FILM_COLLECTION_HISTORY_KEY,
      collectionName,
      size,
      { beforeCursor, afterCursor },
    ],
    async () =>
      await filmFactory.historyCollection({
        collectionName,
        size,
        beforeCursor,
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
  return {
    data,
    error,
    refetch,
  }
}

export default useHistoryCollectionPaginationHook
