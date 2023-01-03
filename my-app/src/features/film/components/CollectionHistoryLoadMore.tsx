/** @jsxImportSource @emotion/react */

import { useCallback, useMemo } from 'react'

import { css } from '@emotion/react'
import { Box, Button, Divider, Typography } from '@mui/joy'
import { arrange, desc, tidy } from '@tidyjs/tidy'

import Spacer from '@/components/ui/Spacer'
import CollectionHistoryContent from '@/features/film/components/CollectionHistoryContent'
import useHistoryCollectionLoadMoreHook from '@/features/film/hooks/historyCollectionLoadMore.hook'
import useLoadMore from '@/features/film/hooks/useLoadMore'
import useQueryCache from '@/features/film/hooks/useQueryCache'
import { FILM_COLLECTION_HISTORY_LOAD_MORE_KEY } from '@/features/film/types'

const CollectionHistoryLoadMore = () => {
  const { variables, setLoadMore } = useLoadMore()
  const cachedData = useQueryCache(FILM_COLLECTION_HISTORY_LOAD_MORE_KEY)
  const neatCachedData = useMemo(() => {
    if (!cachedData) {
      return
    }
    return cachedData
      .map((item) => {
        return item.data
      })
      .flat()
  }, [cachedData])

  const { data } = useHistoryCollectionLoadMoreHook({
    collectionName: 'shows',
    size: 10,
    ...variables,
  })

  const sortedData = useMemo(() => {
    if (!neatCachedData) {
      return
    }
    return tidy(neatCachedData as [], arrange([desc('ts')]))
  }, [neatCachedData])

  const handleNextCursor = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (!data) {
        return
      }
      setLoadMore((prevState) => {
        return {
          ...prevState,
          currentCursor: data.after,
        }
      })
    },
    [data, setLoadMore]
  )

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
      <Divider />
      <Spacer />
      <Button
        fullWidth
        variant='solid'
        color='neutral'
        onClick={handleNextCursor}
        disabled={!data?.after}
      >
        Load More
      </Button>
      <Spacer />
      <CollectionHistoryContent data={sortedData} />
    </Box>
  )
}

export default CollectionHistoryLoadMore
