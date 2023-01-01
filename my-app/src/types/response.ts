import { z } from 'zod'

const BackendResponseSchema = z.object({
  data: z.any(),
  ref: z.any(),
  ts: z.number(),
})

export type BackendResponse = z.infer<typeof BackendResponseSchema>
