/** @jsxImportSource @emotion/react */

import NextLink from 'next/link'

import { css } from '@emotion/react'
import { Box, Button, Divider, Link, Typography } from '@mui/joy'
import { Chance } from 'chance'
import { ArrowLeft } from 'phosphor-react'

import Spacer from '@/components/ui/Spacer'
import { q } from '@/fauna/config'
import useFauna from '@/libs/useFauna'
import { BackendResponse } from '@/types/response'

const FilmsPage = () => {
  const { client, subscribe, unsubscribe } = useFauna('shows')

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

  const handleSubscribe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    subscribe()
  }

  const handleUnSubscribe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    unsubscribe()
  }

  return (
    <Box component={'section'} className={'mx-auto mt-24 w-full max-w-lg'}>
      <Box
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <NextLink href={`/`} passHref>
          <Link underline='none'>
            <ArrowLeft size={32} />
          </Link>
        </NextLink>
        <Typography
          component={'h1'}
          level='h1'
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          Films
        </Typography>
        <Button variant='solid' color='primary' onClick={handleAdd}>
          Add Film
        </Button>
      </Box>
      <Spacer />
      <Divider />
      <Spacer />
      <Button variant='solid' color='neutral' fullWidth onClick={handleFetch}>
        Re Fetch
      </Button>
      <Spacer />
      <Divider />
      <Spacer height='3rem' />
      <Box
        css={css`
          display: flex;
          align-items: center;
          gap: 2rem;
        `}
      >
        <Button
          variant='solid'
          color='danger'
          fullWidth
          onClick={handleUnSubscribe}
        >
          UnSubscribe
        </Button>
        <Button
          variant='solid'
          color='success'
          fullWidth
          onClick={handleSubscribe}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  )
}

export default FilmsPage
