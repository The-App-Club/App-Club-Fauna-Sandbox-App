/** @jsxImportSource @emotion/react */

import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { css } from '@emotion/react'
import { Box, Button, Divider, Link, Typography } from '@mui/joy'
import { ArrowLeft, ArrowSquareOut, Trash } from 'phosphor-react'

import { FallbackDataEmpty } from '@/components/fallback/FallbackDataEmpty'
import { FallbackError } from '@/components/fallback/FallbackError'
import { FallbackLoading } from '@/components/fallback/FallbackLoading'
import Spacer from '@/components/ui/Spacer'
import useDeleteFilmHook from '@/features/film/hooks/delete.hook'
import useFilmListUpHook from '@/features/film/hooks/listUp.hook'
import { FILM_KEY, FilmData } from '@/features/film/types'
import { queryClient } from '@/libs/queryClient'
import useFauna from '@/libs/useFauna'
import { ErrorData } from '@/types/error'
import { FaunaBackendResponse } from '@/types/response'

const FilmsPage = () => {
  const router = useRouter()
  const { removeMutation } = useDeleteFilmHook()
  const { data, error, refetch } = useFilmListUpHook()
  const { subscribe, unsubscribe } = useFauna('shows')

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    router.push({
      pathname: '/film/create',
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
    data: FaunaBackendResponse<FilmData>[] | null | undefined
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
            <Box
              key={index}
              className={`flex items-center justify-between gap-2`}
            >
              <Box
                css={css`
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                `}
              >
                <Trash
                  size={24}
                  onClick={(e: React.MouseEvent) => {
                    removeMutation.mutate({
                      id: id,
                    })
                  }}
                  css={css`
                    min-width: 24px;
                    min-height: 24px;
                    :hover {
                      cursor: pointer;
                    }
                  `}
                />
                <Typography component={'p'} className={`line-clamp-1`}>
                  {film?.title}
                </Typography>
              </Box>
              <Box
                css={css`
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                `}
              >
                <NextLink href={`/films/${id}`} passHref>
                  <Link
                    underline='none'
                    css={css`
                      display: flex;
                      align-items: center;
                    `}
                  >
                    <ArrowSquareOut size={24} />
                  </Link>
                </NextLink>
                <Button
                  variant='solid'
                  color='success'
                  onClick={handleSubscribe}
                >
                  Subscribe
                </Button>
                <Button
                  variant='solid'
                  color='danger'
                  onClick={handleUnSubscribe}
                >
                  UnSubscribe
                </Button>
              </Box>
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
