import { envsafe, num, str } from 'envsafe'

const env = envsafe({
  NEXT_PUBLIC_FAUNADB_SECRET: str({
    default: process.env.NEXT_PUBLIC_FAUNADB_SECRET,
  }),
  NEXT_PUBLIC_DEBUG_FLG: num({
    default: 0,
  }),
  NEXT_PUBLIC_ERROR_RETRY_COUNT: num({
    default: 2,
  }),
  NEXT_PUBLIC_ERROR_RETRY_INTERVAL: num({
    default: 300000,
  }),
})

export { env }
