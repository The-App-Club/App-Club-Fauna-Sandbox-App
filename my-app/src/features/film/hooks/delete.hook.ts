import { useMutation } from '@tanstack/react-query'

import { factory } from '@/features/film/facotry'
import { FilmForm } from '@/features/film/stores/filmForm'
import { FILM_KEY } from '@/features/film/types'
import { queryClient } from '@/libs/queryClient'
import useToast from '@/libs/useToast'

const filmFactory = factory.filmFactory()

const useDeleteFilmHook = () => {
  const { successToast, errorToast } = useToast()
  const removeMutation = useMutation(
    async (variables: Pick<FilmForm, 'id'>) => {
      if (!variables.id) {
        return Promise.reject(new Error('ドキュメントIDは必須です'))
      }
      return await filmFactory.delete({
        id: variables.id as string,
      })
    },
    {
      onSuccess: (
        data: unknown,
        variables: FilmForm,
        context: void | undefined
      ) => {
        console.log('onSuccess')
        queryClient.invalidateQueries([FILM_KEY])
        successToast('削除しました')
      },
      onError: (error: unknown, variables: FilmForm, context: unknown) => {
        console.log('onError', error)
        errorToast(
          'システムエラーが起きました。管理者に連絡してください。[090-1234-5678]'
        )
      },
      onMutate: (variables: FilmForm) => {
        console.log('onMutate')
      },
      onSettled: (data, error, variables, context) => {
        console.log('onSettled')
      },
    }
  )
  return { removeMutation }
}

export default useDeleteFilmHook
