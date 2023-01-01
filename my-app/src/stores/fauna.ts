import { atom } from 'recoil'

import { FaunaManager } from '@/types/fauna'

const faunaState = atom<FaunaManager>({
  key: 'fauna',
  default: {
    client: null,
    streamClient: null,
  },
  dangerouslyAllowMutability: true, // i believe it.
})

export { faunaState }
