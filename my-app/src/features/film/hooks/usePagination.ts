import { useMemo } from 'react'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  paginationState,
  ProgressType,
} from '@/features/film/stores/pagination'

const usePagination = () => {
  const setPagination = useSetRecoilState(paginationState)

  const activePagination = useRecoilValue(paginationState)

  const variables = useMemo(() => {
    return {
      beforeCursor:
        activePagination.mode === ProgressType.PREV
          ? activePagination.currentCursor
          : null,
      afterCursor:
        activePagination.mode === ProgressType.NEXT
          ? activePagination.currentCursor
          : null,
    }
  }, [activePagination])

  return {
    setPagination,
    activePagination,
    variables,
  }
}

export default usePagination
