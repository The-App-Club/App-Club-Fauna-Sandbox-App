import { Merge } from 'type-fest'
import { z } from 'zod'

const Ref = z.object({
  value: z.object({
    id: z.string(),
  }),
})

const BackendResponseSchema = z.object({
  data: z.any(),
  ref: Ref,
  ts: z.number(),
})

export type BackendResponse<T> = Merge<
  z.infer<typeof BackendResponseSchema>,
  { data: T }
>
