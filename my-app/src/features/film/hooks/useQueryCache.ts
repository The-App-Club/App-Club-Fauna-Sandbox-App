import { queryClient } from '@/libs/queryClient'
import { Cursor, FaunaBackendCollectionHistoryResponse } from '@/types/response'

type LoadMoreShortHand = {
  data: FaunaBackendCollectionHistoryResponse[]
  after: Cursor
}

const useQueryCache = (
  mainQueryKey: string
): LoadMoreShortHand[] | undefined => {
  const queryCacheClient = queryClient.getQueryCache()
  const queries = queryCacheClient.findAll()
  if (queries.length === 0) {
    return
  }
  const cachedData: LoadMoreShortHand[] = []
  queries.forEach(({ queryKey }) => {
    const data = queryClient.getQueryData(queryKey, {
      predicate(query) {
        return query.queryKey.includes(mainQueryKey)
      },
    })
    if (data) {
      cachedData.push(data as LoadMoreShortHand)
    }
  })
  return cachedData
}

export default useQueryCache
