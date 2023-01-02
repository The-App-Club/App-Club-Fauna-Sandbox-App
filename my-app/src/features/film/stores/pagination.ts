import { atom } from 'recoil'
import { z } from 'zod'

import { Cursor } from '@/types/response'

export enum ProgressType {
  PREV = 1,
  NEXT = 2,
}

export const PaginationSchema = z.object({
  mode: z.custom<ProgressType>(),
  currentCursor: z.custom<Cursor>().nullish(),
})

export type Pagination = z.infer<typeof PaginationSchema>

const paginationState = atom<Pagination>({
  key: 'pagination',
  default: {
    mode: ProgressType.PREV,
    currentCursor: null,
  },
})

export { paginationState }
