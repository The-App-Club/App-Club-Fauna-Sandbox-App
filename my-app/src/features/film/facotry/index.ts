import { FilmRepository } from '@/features/film/repository'
import { FilmForm } from '@/features/film/stores/filmForm'
import { FilmData } from '@/features/film/types'
import {
  FaunaBackendCollectionHistoryResponse,
  FaunaBackendDocumentHistoryResponse,
  FaunaBackendResponse,
} from '@/types/response'

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
  historyDocument({
    collectionName,
    documentId,
  }: {
    collectionName: string
    documentId: string
  }): Promise<FaunaBackendDocumentHistoryResponse<FilmData>[]>
  historyCollection({
    collectionName,
  }: {
    collectionName: string
  }): Promise<FaunaBackendCollectionHistoryResponse[]>
}

export const factory = {
  filmFactory: (): FilmFactory => {
    return new FilmRepository()
  },
}
