import { useQuery } from '@tanstack/react-query'

import { factory } from '@/features/film/facotry'
import { FILM_KEY, FilmData } from '@/features/film/types'
import { ErrorData } from '@/types/error'
import { BackendResponse } from '@/types/response'

const filmFactory = factory.filmFactory()

const useFindFilmHook = ({ documentId }: { documentId: string }) => {
  const { data, error, refetch } = useQuery<
    BackendResponse<FilmData>,
    ErrorData
  >(
    [FILM_KEY, documentId],
    async () => await filmFactory.find({ documentId }),
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

export default useFindFilmHook
