/** @jsxImportSource @emotion/react */

import { useCallback } from 'react'

import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { css } from '@emotion/react'
import { Box, Button, Divider, Link, Typography } from '@mui/joy'
import { ArrowLeft } from 'phosphor-react'

import { FallbackError } from '@/components/fallback/FallbackError'
import { FallbackLoading } from '@/components/fallback/FallbackLoading'
import Spacer from '@/components/ui/Spacer'
import useDeleteFilmHook from '@/features/film/hooks/delete.hook'
import useFindFilmHook from '@/features/film/hooks/id.hook'
import useSidebar from '@/features/film/hooks/useSidebar'
import { FILM_KEY, FilmData } from '@/features/film/types'
import { queryClient } from '@/libs/queryClient'
import { ErrorData } from '@/types/error'
import { FaunaBackendResponse } from '@/types/response'

const FilmPage = () => {
  const router = useRouter()
  const { setSidebar } = useSidebar()
  const { filmId } = router.query
  const { removeMutation } = useDeleteFilmHook()

  const { data, error, refetch } = useFindFilmHook({
    id: filmId as string,
  })

  const handleDelete = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!filmId) {
        return
      }
      removeMutation.mutate({
        id: filmId as string,
      })
      router.push({
        pathname: '/films',
      })
    },
    [router, filmId, removeMutation]
  )

  const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (data) {
      const { data: item } = data
      if (!item) {
        return
      }
      setSidebar((prevState) => {
        return {
          ...prevState,
          activeFilm: {
            ...item,
            id: filmId as string,
          },
        }
      })
      router.push({
        pathname: '/film/edit',
      })
    }
  }

  const renderContent = ({
    data,
    error,
    refetch,
  }: {
    data: FaunaBackendResponse<FilmData> | null | undefined
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

    const { data: film } = data

    return (
      <Box css={css``}>
        <Typography>{film?.title}</Typography>
        <Typography
          component={'b'}
          css={css`
            font-size: 2.25rem; /* 36px */
            line-height: 2.5rem; /* 40px */
          `}
        >
          {film?.watched ? '視聴済み' : '未視聴'}
        </Typography>
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
        <NextLink href={`/films`} passHref>
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
          Focused Film
        </Typography>
        <Button variant='solid' color='primary' onClick={handleEdit}>
          Edit Film
        </Button>
      </Box>
      <Spacer />
      <Divider />
      <Spacer />
      {renderContent({ data, error, refetch })}
      <Spacer />
      <Divider />
      <Spacer />
      <Button variant='solid' color='danger' fullWidth onClick={handleDelete}>
        Delete Film
      </Button>
    </Box>
  )
}

export default FilmPage
