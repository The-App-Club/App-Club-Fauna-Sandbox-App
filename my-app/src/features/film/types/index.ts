import { z } from 'zod'

import { FilmSchema } from '@/features/film/domains/film'

const FilmData = FilmSchema.nullish()

export type FilmData = z.infer<typeof FilmData>
export const FILM_KEY = 'film'
export const FILM_COLLECTION_HISTORY_KEY = 'filmCollectionHistory'
export const FILM_COLLECTION_HISTORY_LOAD_MORE_KEY =
  'filmCollectionHistoryLoadMore'
export const FILM_DOCUMENT_HISTORY_KEY = 'filmDocumentHistory'
