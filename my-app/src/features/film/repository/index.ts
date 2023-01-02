import faunadb from 'faunadb'

import { env } from '@/config/env'
import { FaunaDBClient, q } from '@/fauna/config'
import { FilmFactory } from '@/features/film/facotry'
import { FilmForm } from '@/features/film/stores/filmForm'
import { FilmData } from '@/features/film/types'
import {
  FaunaBackendCollectionHistoryResponse,
  FaunaBackendDocumentHistoryResponse,
  FaunaBackendResponse,
} from '@/types/response'

export class FilmRepository implements FilmFactory {
  private client: FaunaDBClient
  constructor(clientConfig?: faunadb.ClientConfig) {
    const neatSecret = clientConfig?.secret || env.NEXT_PUBLIC_FAUNADB_SECRET
    this.client = new faunadb.Client({
      secret: neatSecret,
      domain: 'db.fauna.com',
      // NOTE: Use the correct domain for your database's Region Group.
      port: 443,
      scheme: 'https',
      queryTimeout: 2000,
      observer(res, client) {
        // console.log(res, client)
      },
    })
  }
  async historyCollection({
    collectionName,
  }: {
    collectionName: string
  }): Promise<FaunaBackendCollectionHistoryResponse[]> {
    try {
      const {
        data,
        after,
      }: {
        data: FaunaBackendCollectionHistoryResponse[]
        after: FaunaBackendCollectionHistoryResponse
      } = await this.client.query(
        q.Paginate(q.Events(q.Documents(q.Collection(collectionName))))
      )
      return data
    } catch (error) {
      throw error
    }
  }
  async historyDocument({
    collectionName,
    documentId,
  }: {
    collectionName: string
    documentId: string
  }): Promise<FaunaBackendDocumentHistoryResponse<FilmData>[]> {
    try {
      const {
        data,
      }: { data: FaunaBackendDocumentHistoryResponse<FilmData>[] } =
        await this.client.query(
          q.Paginate(q.Events(q.Ref(q.Collection(collectionName), documentId)))
        )
      return data
    } catch (error) {
      throw error
    }
  }
  async listUp(): Promise<FaunaBackendResponse<FilmData>[]> {
    try {
      const { data }: { data: FaunaBackendResponse<FilmData>[] } =
        await this.client.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection('shows'))),
            q.Lambda('ref', q.Get(q.Var('ref')))
          )
        )
      return data
    } catch (error) {
      throw error
    }
  }
  async create({
    film,
  }: {
    film: FilmForm
  }): Promise<FaunaBackendResponse<FilmData>> {
    try {
      const data: FaunaBackendResponse<FilmData> = await this.client.query(
        q.Create(q.Collection('shows'), {
          data: film,
        })
      )
      return data
    } catch (error) {
      throw error
    }
  }
  async update({
    id,
    film,
  }: {
    id: string
    film: FilmForm
  }): Promise<FaunaBackendResponse<FilmData>> {
    try {
      const data: FaunaBackendResponse<FilmData> = await this.client.query(
        q.Update(q.Ref(q.Collection('shows'), id), {
          data: film,
        })
      )
      return data
    } catch (error) {
      throw error
    }
  }
  async delete({
    id,
  }: {
    id: string
  }): Promise<FaunaBackendResponse<FilmData>> {
    try {
      const data: FaunaBackendResponse<FilmData> = await this.client.query(
        q.Delete(q.Ref(q.Collection('shows'), id))
      )
      return data
    } catch (error) {
      throw error
    }
  }
  async find({ id }: { id: string }): Promise<FaunaBackendResponse<FilmData>> {
    try {
      console.log(id)
      const data: FaunaBackendResponse<FilmData> = await this.client.query(
        q.Get(q.Ref(q.Collection('shows'), id))
      )
      return data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
