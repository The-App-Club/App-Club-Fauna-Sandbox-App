import { FaunaDBQueryManager, q } from '@/fauna/config'
import { CreateCollectionIfNotExists, CreateOrUpdateIndex } from '@/fauna/utils'

const setup = async () => {
  try {
    let client = new FaunaDBQueryManager().getClient()
    let response
    response = await client.query(
      q.Do(CreateCollectionIfNotExists({ name: 'shows' }))
    )
    console.log(response)
    response = await client.query(
      CreateOrUpdateIndex({
        name: 'shows_by_title',
        source: q.Collection('shows'),
        terms: [
          {
            field: ['data', 'title'],
          },
        ],
        unique: true,
      })
    )
    console.log(response)
    response = await client.query(
      q.Map(
        [
          {
            title: '劇場版 「カウボーイビバップ 天国の扉」',
            watched: false,
          },
          {
            title: 'TVアニメ「その着せ替え人形は恋をする」',
            watched: false,
          },
          {
            title: 'TVアニメ「SHIROBAKO」',
            watched: false,
          },
          {
            title: 'TVアニメ『理系が恋に落ちたので証明してみた。』',
            watched: false,
          },
        ],
        q.Lambda(
          'show',
          q.Let(
            {
              count: q.Count(
                q.Paginate(
                  q.Match(
                    q.Index('shows_by_title'),
                    q.Select(['title'], q.Var('show'))
                  )
                )
              ),
              is_exists: q.Equals(q.Select(['data', 0], q.Var('count')), 1),
            },
            q.If(
              q.Not(q.Var('is_exists')),
              q.Create(q.Collection('shows'), {
                data: q.Var('show'),
              }),
              `already exists, not populate`
            )
          )
        )
      )
    )
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export { setup }
