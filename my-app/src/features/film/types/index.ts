import { z } from 'zod'

import { FilmSchema } from '@/features/film/domains/film'

const FilmData = FilmSchema.nullish()

export type FilmData = z.infer<typeof FilmData>
export const FILM_KEY = 'film'
