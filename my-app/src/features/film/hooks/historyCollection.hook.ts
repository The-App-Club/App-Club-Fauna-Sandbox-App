import { useQuery } from '@tanstack/react-query'

import { factory } from '@/features/film/facotry'
import { FILM_COLLECTION_HISTORY_KEY } from '@/features/film/types'
import { ErrorData } from '@/types/error'
import { FaunaBackendCollectionHistoryResponse } from '@/types/response'

const filmFactory = factory.filmFactory()

const useHistoryCollectionHook = ({
  collectionName,
}: {
  collectionName: string
}) => {
  const { data, error, refetch } = useQuery<
    FaunaBackendCollectionHistoryResponse[],
    ErrorData
  >(
    [FILM_COLLECTION_HISTORY_KEY],
    async () => await filmFactory.historyCollection({ collectionName }),
    {
      onSuccess: function (data) {
        console.log(`onSuccess`)
      },
      onError: function (error) {
        console.log(`onError`, error)
      },
      onSettled: function (data, error) {
        console.log(`onSettled`)
      },
    }
  )
  return { data, error, refetch }
}

export default useHistoryCollectionHook
