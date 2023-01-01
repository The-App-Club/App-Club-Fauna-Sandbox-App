import { FilmRepository } from '@/features/film/repository'
import { FilmForm } from '@/features/film/stores/filmForm'
import { FilmData } from '@/features/film/types'
import { BackendResponse } from '@/types/response'

// https://docs.fauna.com/fauna/current/api/fql/functions/ref?lang=javascript#parameters
export interface FilmFactory {
  find({
    documentId,
  }: {
    documentId: string
  }): Promise<BackendResponse<FilmData>>
  listUp(): Promise<BackendResponse<FilmData>[]>
  create({ film }: { film: FilmForm }): Promise<BackendResponse<FilmData>>
  update({
    documentId,
    film,
  }: {
    documentId: string
    film: FilmForm
  }): Promise<BackendResponse<FilmData>>
  delete({
    documentId,
  }: {
    documentId: string
  }): Promise<BackendResponse<FilmData>>
}

export const factory = {
  filmFactory: (): FilmFactory => {
    return new FilmRepository()
  },
}
