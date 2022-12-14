/** @jsxImportSource @emotion/react */

import { useCallback, useMemo } from 'react'

import NextLink from 'next/link'

import { css } from '@emotion/react'
import { Box, Button, Typography } from '@mui/joy'
import { Link } from '@mui/joy'
import { arrange, desc, tidy } from '@tidyjs/tidy'

import { FallbackDataEmpty } from '@/components/fallback/FallbackDataEmpty'
import { FallbackError } from '@/components/fallback/FallbackError'
import { FallbackLoading } from '@/components/fallback/FallbackLoading'
import Spacer from '@/components/ui/Spacer'
import useHistoryCollectionPaginationHook from '@/features/film/hooks/historyCollectionPagination.hook'
import usePagination from '@/features/film/hooks/usePagination'
import { ProgressType } from '@/features/film/stores/pagination'
import { FILM_COLLECTION_HISTORY_KEY } from '@/features/film/types'
import { queryClient } from '@/libs/queryClient'
import { ErrorData } from '@/types/error'
import { FaunaBackendCollectionHistoryResponse } from '@/types/response'
import { formatRelativeTime, yyyymmddhhmmss } from '@/utils/dateUtil'

const CollectionHistory = () => {
  const { variables, setPagination } = usePagination()
  const { data, error, refetch } = useHistoryCollectionPaginationHook({
    collectionName: 'shows',
    size: 10,
    ...variables,
  })

  const sortedData = useMemo(() => {
    if (!data) {
      return
    }

    const { data: currentData } = data

    return tidy(currentData as [], arrange([desc('ts')]))
  }, [data])

  const handlePrevCursor = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (!data) {
        return
      }
      setPagination((prevState) => {
        return {
          ...prevState,
          mode: ProgressType.PREV,
          currentCursor: data.before,
        }
      })
    },
    [data, setPagination]
  )

  const handleNextCursor = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (!data) {
        return
      }
      setPagination((prevState) => {
        return {
          ...prevState,
          mode: ProgressType.NEXT,
          currentCursor: data.after,
        }
      })
    },
    [data, setPagination]
  )

  const renderContent = ({
    data,
    error,
    refetch,
  }: {
    data: FaunaBackendCollectionHistoryResponse[] | null | undefined
    error: ErrorData | null | undefined
    refetch: any
  }) => {
    if (error) {
      return (
        <FallbackError
          message={error.message}
          iconSize={40}
          refetch={() => {
            queryClient.removeQueries([FILM_COLLECTION_HISTORY_KEY])
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
          const { action, document, ts } = item
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
                <Typography component={'b'} className={`line-clamp-1`}>
                  {action}
                </Typography>
                <Typography>{yyyymmddhhmmss(ts / 1000)}</Typography>
                <Typography>{formatRelativeTime(ts / 1000)}</Typography>
                <NextLink href={`/films/${document.value.id}`} passHref>
                  <Link>{`#${document.value.id}`}</Link>
                </NextLink>
              </Box>
            </Box>
          )
        })}
      </Box>
    )
  }

  return (
    <Box component={'aside'} className={'mx-auto mt-24 w-full max-w-lg'}>
      <Box
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <Typography
          component={'h1'}
          level='h1'
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
          `}
        >
          Collection History
        </Typography>
      </Box>
      <Spacer />
      <Box
        css={css`
          display: flex;
          align-items: center;
          gap: 0.5rem;
        `}
      >
        <Button
          variant='solid'
          color='neutral'
          onClick={handlePrevCursor}
          disabled={!data?.before}
        >
          Prev Cursor
        </Button>
        <Button
          variant='solid'
          color='neutral'
          onClick={handleNextCursor}
          disabled={!data?.after}
        >
          Next Cursor
        </Button>
      </Box>

      {renderContent({ data: sortedData, error, refetch })}
    </Box>
  )
}

export default CollectionHistory
