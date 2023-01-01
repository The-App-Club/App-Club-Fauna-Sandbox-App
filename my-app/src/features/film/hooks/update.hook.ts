import { useMutation } from '@tanstack/react-query'

import { factory } from '@/features/film/facotry'
import { FilmForm } from '@/features/film/stores/filmForm'
import { FILM_KEY } from '@/features/film/types'
import { queryClient } from '@/libs/queryClient'
import useToast from '@/libs/useToast'

const filmFactory = factory.filmFactory()

const useUpdateFilmHook = () => {
  const { successToast, errorToast } = useToast()
  const updateMutation = useMutation(
    async (variables: FilmForm) => {
      if (!variables.id) {
        return Promise.reject(new Error('ドキュメントIDは必須です'))
      }
      return await filmFactory.update({
        id: variables.id as string,
        film: { ...variables },
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
        successToast('更新しました')
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
  return { updateMutation }
}

export default useUpdateFilmHook
