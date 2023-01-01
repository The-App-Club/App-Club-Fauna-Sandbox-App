import { Box, Button, Typography } from '@mui/joy'
import { Chance } from 'chance'

import { doClean } from '@/fauna/clean'
import { q } from '@/fauna/config'
import { setup } from '@/fauna/setup'
import useFauna from '@/hooks/useFauna'
import { BackendResponse } from '@/types/response'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const { client, subscribe, unsubscribe } = useFauna('shows')
  const handleSetup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const response = await setup()
    console.log(response)
  }

  const handleClean = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const response = await doClean()
    console.log(response)
  }

  const handleFetch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (client) {
      const response: { data: BackendResponse[] } = await client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('shows'))),
          q.Lambda('ref', q.Get(q.Var('ref')))
        )
      )
      console.log(response.data)
    }
  }

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (client) {
      const response: BackendResponse = await client.query(
        q.Create(q.Collection('shows'), {
          data: {
            title: Chance().name(),
            watched: false,
          },
        })
      )
      console.log(response)
    }
  }

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    // const client = new FaunaDBQueryManager().getClient()
    // const response: BackendResponse = await client.query(
    //   q.Update(q.Collection('shows'), {
    //     data: {
    //       title: Chance().name(),
    //       watched: false,
    //     },
    //   })
    // )
    // console.log(response)
  }

  const handleSubscribe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    subscribe()
  }

  const handleUnSubscribe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    unsubscribe()
  }

  return (
    <Box>
      <Typography component={'h1'} level={'h1'}>
        Hello World
      </Typography>
      <Button variant='solid' color='primary' onClick={handleClean}>
        Do Clean
      </Button>
      <Button variant='solid' color='primary' onClick={handleSetup}>
        Do Setup
      </Button>
      <Button variant='solid' color='primary' onClick={handleFetch}>
        Do Fetch
      </Button>
      <Button variant='solid' color='primary' onClick={handleAdd}>
        Add Film
      </Button>
      <Button variant='solid' color='primary' onClick={handleUpdate}>
        Update Film
      </Button>
      <Button variant='solid' color='primary' onClick={handleSubscribe}>
        Subscribe
      </Button>
      <Button variant='solid' color='primary' onClick={handleUnSubscribe}>
        UnSubscribe
      </Button>
    </Box>
  )
}

export default Home
