import { QueryClient } from '@tanstack/react-query'

import { env } from '@/config/env'

export const generateQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        networkMode: 'online',
        retry: env.NEXT_PUBLIC_ERROR_RETRY_COUNT,
        retryDelay: env.NEXT_PUBLIC_ERROR_RETRY_INTERVAL,
      },
      mutations: {},
    },
  })
}

export const queryClient = generateQueryClient()
