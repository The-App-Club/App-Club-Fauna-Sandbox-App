import { useMemo } from 'react'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import { loadMoreState } from '@/features/film/stores/loadMore'

const useLoadMore = () => {
  const setLoadMore = useSetRecoilState(loadMoreState)

  const activeLoadMore = useRecoilValue(loadMoreState)

  const variables = useMemo(() => {
    return {
      afterCursor: activeLoadMore.currentCursor,
    }
  }, [activeLoadMore])

  return {
    setLoadMore,
    activeLoadMore,
    variables,
  }
}

export default useLoadMore
