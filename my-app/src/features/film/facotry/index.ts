import { FilmRepository } from '@/features/film/repository'
import { FilmForm } from '@/features/film/stores/filmForm'
import { FilmData } from '@/features/film/types'
import { FaunaBackendResponse } from '@/types/response'

// https://docs.fauna.com/fauna/current/api/fql/functions/ref?lang=javascript#parameters
export interface FilmFactory {
  find({ id }: { id: string }): Promise<FaunaBackendResponse<FilmData>>
  listUp(): Promise<FaunaBackendResponse<FilmData>[]>
  create({ film }: { film: FilmForm }): Promise<FaunaBackendResponse<FilmData>>
  update({
    id,
    film,
  }: {
    id: string
    film: FilmForm
  }): Promise<FaunaBackendResponse<FilmData>>
  delete({ id }: { id: string }): Promise<FaunaBackendResponse<FilmData>>
}

export const factory = {
  filmFactory: (): FilmFactory => {
    return new FilmRepository()
  },
}
