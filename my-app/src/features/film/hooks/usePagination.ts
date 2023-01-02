import { useMemo } from 'react'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import { paginationState } from '@/features/film/stores/pagination'

const usePagination = () => {
  const setPagination = useSetRecoilState(paginationState)

  const activePagination = useRecoilValue(paginationState)

  const variables = useMemo(() => {
    console.log(activePagination)
    return {
      beforeCursor:
        activePagination.mode === 0 ? activePagination.currentCursor : null,
      afterCursor:
        activePagination.mode === 1 ? activePagination.currentCursor : null,
    }
  }, [activePagination])

  return {
    setPagination,
    activePagination,
    variables,
  }
}

export default usePagination
