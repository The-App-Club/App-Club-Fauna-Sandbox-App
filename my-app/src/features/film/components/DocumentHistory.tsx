/** @jsxImportSource @emotion/react */

import { useMemo } from 'react'

import { useRouter } from 'next/router'

import { css } from '@emotion/react'
import { Box, Typography } from '@mui/joy'
import { arrange, desc, tidy } from '@tidyjs/tidy'
import { ArrowsClockwise } from 'phosphor-react'

import { FallbackDataEmpty } from '@/components/fallback/FallbackDataEmpty'
import { FallbackError } from '@/components/fallback/FallbackError'
import { FallbackLoading } from '@/components/fallback/FallbackLoading'
import Spacer from '@/components/ui/Spacer'
import useHistoryDocumentHook from '@/features/film/hooks/historyDocument.hook'
import { FILM_DOCUMENT_HISTORY_KEY, FilmData } from '@/features/film/types'
import { queryClient } from '@/libs/queryClient'
import { ErrorData } from '@/types/error'
import { FaunaBackendDocumentHistoryResponse } from '@/types/response'
import { yyyymmddhhmmss } from '@/utils/dateUtil'

const DocumentHistory = () => {
  const router = useRouter()
  const { filmId } = router.query
  const { data, error, refetch } = useHistoryDocumentHook({
    id: filmId as string,
    collectionName: 'shows',
  })

  const handleRefresh = async (e: React.MouseEvent) => {
    queryClient.removeQueries([FILM_DOCUMENT_HISTORY_KEY])
    await refetch()
  }

  const sortedData = useMemo(() => {
    if (!data) {
      return
    }

    return tidy(data as [], arrange([desc('ts')]))
  }, [data])

  const renderContent = ({
    data,
    error,
    refetch,
  }: {
    data: FaunaBackendDocumentHistoryResponse<FilmData>[] | null | undefined
    error: ErrorData | null | undefined
    refetch: any
  }) => {
    if (error) {
      return (
        <FallbackError
          message={error.message}
          iconSize={40}
          refetch={() => {
            queryClient.removeQueries([FILM_DOCUMENT_HISTORY_KEY])
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
          const { data: film, action, document, ts } = item
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
                <Typography>{`#${document.value.id}`}</Typography>
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
          Focused Film History
          <ArrowsClockwise
            size={32}
            onClick={handleRefresh}
            css={css`
              :hover {
                cursor: pointer;
              }
            `}
          />
        </Typography>
      </Box>
      <Spacer />

      {renderContent({ data: sortedData, error, refetch })}
    </Box>
  )
}

export default DocumentHistory
