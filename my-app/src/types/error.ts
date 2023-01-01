import { RequestResult } from 'faunadb'
import { z } from 'zod'

const ErrorDataSchema = z.object({
  description: z.string(),
  message: z.string(),
  name: z.string(),
  requestResult: z.custom<RequestResult>(),
})

export type ErrorData = z.infer<typeof ErrorDataSchema>
