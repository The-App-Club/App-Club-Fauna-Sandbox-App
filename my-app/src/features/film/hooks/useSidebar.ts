import { useMemo } from 'react'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import { sidebarState } from '@/features/film/stores/sidebar'

const useSidebar = () => {
  const setSidebar = useSetRecoilState(sidebarState)

  const activeSidebar = useRecoilValue(sidebarState)

  const { activeFilm } = useMemo(() => {
    return { ...activeSidebar }
  }, [activeSidebar])

  return {
    setSidebar,
    activeSidebar,
    activeFilm,
  }
}

export default useSidebar
