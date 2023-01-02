import { atom } from 'recoil'
import { z } from 'zod'

import { Cursor } from '@/types/response'

export const PaginationSchema = z.object({
  mode: z.number(),
  currentCursor: z.custom<Cursor>().nullish(),
})

export type Pagination = z.infer<typeof PaginationSchema>

const paginationState = atom<Pagination>({
  key: 'pagination',
  default: {
    mode: 1,
    currentCursor: null,
  },
})

export { paginationState }
