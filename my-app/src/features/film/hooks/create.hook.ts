import { useMutation } from '@tanstack/react-query'

import { factory } from '@/features/film/facotry'
import { FilmForm } from '@/features/film/stores/filmForm'
import { FILM_KEY } from '@/features/film/types'
import { queryClient } from '@/libs/queryClient'
import useToast from '@/libs/useToast'

const filmFactory = factory.filmFactory()

const useCreateFilmHook = () => {
  const { successToast, errorToast } = useToast()
  const addMutation = useMutation(
    async (variables: FilmForm) => {
      return await filmFactory.create({
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
        successToast('登録しました')
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
  return { addMutation }
}

export default useCreateFilmHook
