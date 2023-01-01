/** @jsxImportSource @emotion/react */

import { useRouter } from 'next/router'

import { css } from '@emotion/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/joy'
import { useForm } from 'react-hook-form'

import { FallbackLoading } from '@/components/fallback/FallbackLoading'
import BebopCheckbox from '@/components/ui/BebopCheckbox'
import BebopTextField from '@/components/ui/BebopTextfield'
import Spacer from '@/components/ui/Spacer'
import useUpdateFilmHook from '@/features/film/hooks/update.hook'
import useSidebar from '@/features/film/hooks/useSidebar'
import { FilmFormSchema } from '@/features/film/stores/filmForm'
import { merge } from '@/utils/mergeUtil'

const EditForm = () => {
  const router = useRouter()
  const { updateMutation } = useUpdateFilmHook()

  const { activeFilm } = useSidebar()
  const {
    register,
    handleSubmit,
    setError,
    watch,
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
    const willPostedData = merge(data, { id: activeFilm.id })
    updateMutation.mutate(willPostedData)
    router.push({
      pathname: '/films',
    })
  }

  if (!activeFilm) {
    return <FallbackLoading />
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
        disabled={true}
        name={'id'}
        type={'text'}
        labelName={`ID`}
        placeholder={``}
        required
        tooltipText='IDのツールチップになります'
        defaultValue={activeFilm.id || ``}
        register={register}
        errors={errors}
      />
      <Spacer />
      <BebopTextField
        autoFocus
        name={'title'}
        type={'text'}
        labelName={`映画名`}
        placeholder={`ローマの休日`}
        required
        tooltipText='映画名のツールチップになります'
        defaultValue={activeFilm.title || ``}
        register={register}
        errors={errors}
      />
      <Spacer />
      <BebopCheckbox
        name={'watched'}
        labelName={`視聴状態`}
        checkLabelName={watch('watched') ? '視聴済み' : '未視聴'}
        required
        tooltipText='視聴状態のツールチップになります'
        defaultValue={activeFilm.watched || false}
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
        更新する
      </Button>
    </Box>
  )
}

export default EditForm
