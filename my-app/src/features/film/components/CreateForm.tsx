/** @jsxImportSource @emotion/react */

import { useRouter } from 'next/router'

import { css } from '@emotion/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/joy'
import { Chance } from 'chance'
import { useForm } from 'react-hook-form'

import BebopTextField from '@/components/ui/BebopTextfield'
import Spacer from '@/components/ui/Spacer'
import useCreateFilmHook from '@/features/film/hooks/create.hook'
import useSidebar from '@/features/film/hooks/useSidebar'
import { FilmFormSchema } from '@/features/film/stores/filmForm'
import { merge } from '@/utils/mergeUtil'

const CreateForm = () => {
  const router = useRouter()
  const { addMutation } = useCreateFilmHook()

  const { activeFilm } = useSidebar()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitted },
  } = useForm({ resolver: zodResolver(FilmFormSchema), mode: 'all' })
  const onSubmit = (data: any) => {
    if (!activeFilm) {
      return
    }
    setError('Do submit', {
      message: 'Thank you submit!',
      type: 'disabled',
    })
    const willPostedData = merge(data, { watched: false })
    addMutation.mutate(willPostedData)
    router.push({
      pathname: '/films',
    })
  }

  return (
    <Box
      component={'form'}
      css={css`
        max-width: 100%;
        width: 100%;
      `}
      onSubmit={handleSubmit(onSubmit)}
    >
      <BebopTextField
        autoFocus
        name={'title'}
        type={'text'}
        labelName={`映画名`}
        placeholder={`ローマの休日`}
        required
        tooltipText='映画名のツールチップになります'
        defaultValue={Chance().name()}
        register={register}
        errors={errors}
      />
      <Spacer />
      <Button
        disabled={!isValid}
        loading={isSubmitted}
        loadingPosition='end'
        variant='solid'
        color='primary'
        fullWidth
        type='submit'
      >
        登録する
      </Button>
    </Box>
  )
}

export default CreateForm
