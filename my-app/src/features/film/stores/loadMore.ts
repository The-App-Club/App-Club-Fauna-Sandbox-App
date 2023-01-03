import { atom } from 'recoil'
import { z } from 'zod'

import { Cursor } from '@/types/response'

export const LoadMoreSchema = z.object({
  currentCursor: z.custom<Cursor>().nullish(),
})

export type LoadMore = z.infer<typeof LoadMoreSchema>

const loadMoreState = atom<LoadMore>({
  key: 'loadMore',
  default: {
    currentCursor: null,
  },
})

export { loadMoreState }
