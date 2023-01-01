import { envsafe, num, str } from 'envsafe'

const env = envsafe({
  NEXT_PUBLIC_FAUNADB_SECRET: str({
    default: process.env.NEXT_PUBLIC_FAUNADB_SECRET,
  }),
  NEXT_PUBLIC_DEBUG_FLG: num({
    default: 0,
  }),
})

export { env }
