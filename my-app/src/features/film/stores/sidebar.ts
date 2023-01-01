import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import type { FilmForm } from '@/features/film/stores/filmForm'

const { persistAtom } = recoilPersist()

type Sidebar = {
  activeFilm: FilmForm
}

const sidebarState = atom<Sidebar>({
  key: 'filmSidebar',
  default: {
    activeFilm: null,
  },
  effects_UNSTABLE: [persistAtom],
})

export { sidebarState }
