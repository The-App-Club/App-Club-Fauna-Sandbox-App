import { useQuery } from '@tanstack/react-query'

import { factory } from '@/features/film/facotry'
import { FILM_DOCUMENT_HISTORY_KEY, FilmData } from '@/features/film/types'
import { ErrorData } from '@/types/error'
import { FaunaBackendDocumentHistoryResponse } from '@/types/response'

const filmFactory = factory.filmFactory()

const useHistoryDocumentHook = ({
  collectionName,
  id,
}: {
  collectionName: string
  id: string
}) => {
  const { data, error, refetch } = useQuery<
    FaunaBackendDocumentHistoryResponse<FilmData>[],
    ErrorData
  >(
    [FILM_DOCUMENT_HISTORY_KEY, id],
    async () =>
      await filmFactory.historyDocument({ collectionName, documentId: id }),
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

export default useHistoryDocumentHook
