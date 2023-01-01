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

const VanillaBackendResponseSchema = z.object({
  message: z.string(),
})

export type FaunaBackendResponse<T> = Merge<
  z.infer<typeof BackendResponseSchema>,
  { data: T }
>

export type BackendResponse = z.infer<typeof VanillaBackendResponseSchema>
