import { Merge } from 'type-fest'
import { z } from 'zod'

const Ref = z.object({
  value: z.object({
    id: z.string(),
  }),
})

// https://docs.fauna.com/fauna/current/api/fql/functions/paginate?lang=javascript#cursor

const CursorSchema = z
  .object({
    ts: z.number(),
  })
  .nullish()

const BackendResponseSchema = z.object({
  data: z.any(),
  ref: Ref,
  ts: z.number(),
})

const FaunaBackendMetaResponseSchema = z.object({
  document: Ref,
  ts: z.number(),
})

const FaunaBackendCollectionHistoryResponseSchema = z.object({
  document: Ref,
  ts: z.number(),
  action: z.string(), // add, remove
})

const FaunaBackendDocumentHistoryResponseSchema = z.object({
  data: z.any(),
  document: Ref,
  ts: z.number(),
  action: z.string(), // create, update, delete
})

const VanillaBackendResponseSchema = z.object({
  message: z.string(),
})

export type Cursor = z.infer<typeof CursorSchema>

export type FaunaBackendCollectionHistoryResponse = z.infer<
  typeof FaunaBackendCollectionHistoryResponseSchema
>

export type FaunaBackendMetaResponse = z.infer<
  typeof FaunaBackendMetaResponseSchema
>

export type FaunaBackendDocumentHistoryResponse<T> = Merge<
  z.infer<typeof FaunaBackendDocumentHistoryResponseSchema>,
  {
    data: T
  }
>

export type FaunaBackendResponse<T> = Merge<
  z.infer<typeof BackendResponseSchema>,
  { data: T }
>

export type BackendResponse = z.infer<typeof VanillaBackendResponseSchema>
