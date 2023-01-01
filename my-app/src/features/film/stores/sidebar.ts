import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import type { FilmData } from '@/features/film/types'

const { persistAtom } = recoilPersist()

type Sidebar = {
  activeFilm: FilmData
}

const sidebarState = atom<Sidebar>({
  key: 'filmSidebar',
  default: {
    activeFilm: null,
  },
  effects_UNSTABLE: [persistAtom],
})

export { sidebarState }
