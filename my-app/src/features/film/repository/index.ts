import faunadb from 'faunadb'

import { env } from '@/config/env'
import { FaunaDBClient, q } from '@/fauna/config'
import { FilmFactory } from '@/features/film/facotry'
import { FilmForm } from '@/features/film/stores/filmForm'
import { FilmData } from '@/features/film/types'
import { BackendResponse } from '@/types/response'

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
    })
  }
  async listUp(): Promise<BackendResponse<FilmData>[]> {
    try {
      const { data }: { data: BackendResponse<FilmData>[] } =
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
  }): Promise<BackendResponse<FilmData>> {
    try {
      const data: BackendResponse<FilmData> = await this.client.query(
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
    documentId,
    film,
  }: {
    documentId: string
    film: FilmForm
  }): Promise<BackendResponse<FilmData>> {
    try {
      const data: BackendResponse<FilmData> = await this.client.query(
        q.Update(q.Ref(q.Collection('shows'), documentId), {
          data: film,
        })
      )
      return data
    } catch (error) {
      throw error
    }
  }
  async delete({
    documentId,
  }: {
    documentId: string
  }): Promise<BackendResponse<FilmData>> {
    try {
      const data: BackendResponse<FilmData> = await this.client.query(
        q.Delete(q.Ref(q.Collection('shows'), documentId))
      )
      return data
    } catch (error) {
      throw error
    }
  }
}
