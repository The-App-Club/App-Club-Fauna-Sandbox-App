/** @jsxImportSource @emotion/react */

import NextLink from 'next/link'

import { css } from '@emotion/react'
import { Box, Button, Checkbox, Divider, Link, Typography } from '@mui/joy'
import { Chance } from 'chance'
import { ArrowLeft, Trash } from 'phosphor-react'

import { FallbackDataEmpty } from '@/components/fallback/FallbackDataEmpty'
import { FallbackError } from '@/components/fallback/FallbackError'
import { FallbackLoading } from '@/components/fallback/FallbackLoading'
import Spacer from '@/components/ui/Spacer'
import useCreateFilmHook from '@/features/film/hooks/create.hook'
import useDeleteFilmHook from '@/features/film/hooks/delete.hook'
import useFilmListUpHook from '@/features/film/hooks/listUp.hook'
import useUpdateFilmHook from '@/features/film/hooks/update.hook'
import { FILM_KEY, FilmData } from '@/features/film/types'
import { queryClient } from '@/libs/queryClient'
import useFauna from '@/libs/useFauna'
import { ErrorData } from '@/types/error'
import { BackendResponse } from '@/types/response'

const FilmsPage = () => {
  const { addMutation } = useCreateFilmHook()
  const { updateMutation } = useUpdateFilmHook()
  const { removeMutation } = useDeleteFilmHook()
  const { data, error, refetch } = useFilmListUpHook()
  const { subscribe, unsubscribe } = useFauna('shows')

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    addMutation.mutate({
      title: Chance().name(),
      watched: false,
    })
  }

  const handleSubscribe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    subscribe()
  }

  const handleUnSubscribe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    unsubscribe()
  }

  const renderContent = ({
    data,
    error,
    refetch,
  }: {
    data: BackendResponse<FilmData>[] | null | undefined
    error: ErrorData | null | undefined
    refetch: any
  }) => {
    if (error) {
      return (
        <FallbackError
          message={error.message}
          iconSize={40}
          refetch={() => {
            queryClient.removeQueries([FILM_KEY])
            refetch()
          }}
        />
      )
    }

    if (!data) {
      return <FallbackLoading />
    }

    if (data.length === 0) {
      return <FallbackDataEmpty />
    }

    return (
      <Box className={`flex flex-col gap-2`}>
        {data.map((item, index) => {
          const {
            data: film,
            ref: {
              value: { id },
            },
          } = item
          return (
            <Box key={index} className={`flex items-center gap-2`}>
              <Trash
                size={24}
                onClick={(e: React.MouseEvent) => {
                  removeMutation.mutate({
                    documentId: id,
                  })
                }}
                css={css`
                  :hover {
                    cursor: pointer;
                  }
                `}
              />
              <Checkbox
                color='neutral'
                checked={film?.watched}
                label={film?.title}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation()
                  updateMutation.mutate({
                    documentId: id,
                    ...film,
                    watched: (e.target as HTMLInputElement).checked,
                  })
                }}
              />
            </Box>
          )
        })}
      </Box>
    )
  }

  return (
    <Box component={'section'} className={'mx-auto mt-24 w-full max-w-lg'}>
      <Box
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <NextLink href={`/`} passHref>
          <Link underline='none'>
            <ArrowLeft size={32} />
          </Link>
        </NextLink>
        <Typography
          component={'h1'}
          level='h1'
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          Films
        </Typography>
        <Button variant='solid' color='primary' onClick={handleAdd}>
          Add Film
        </Button>
      </Box>
      <Spacer />
      {renderContent({ data, error, refetch })}
      <Spacer />
      <Divider />
      <Spacer height='3rem' />
      <Box
        css={css`
          display: flex;
          align-items: center;
          gap: 2rem;
        `}
      >
        <Button
          variant='solid'
          color='danger'
          fullWidth
          onClick={handleUnSubscribe}
        >
          UnSubscribe
        </Button>
        <Button
          variant='solid'
          color='success'
          fullWidth
          onClick={handleSubscribe}
        >
          Subscribe
        </Button>
      </Box>
      <Spacer />
    </Box>
  )
}

export default FilmsPage
