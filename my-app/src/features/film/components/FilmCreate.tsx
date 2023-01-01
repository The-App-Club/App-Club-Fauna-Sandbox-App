/** @jsxImportSource @emotion/react */

import NextLink from 'next/link'

import { css } from '@emotion/react'
import { Box, Divider, Link, Typography } from '@mui/joy'
import { ArrowLeft } from 'phosphor-react'

import Spacer from '@/components/ui/Spacer'
import CreateForm from '@/features/film/components/CreateForm'

const FilmCreatePage = () => {
  return (
    <Box component={'section'} className={'mx-auto mt-24 w-full max-w-lg'}>
      <Box
        css={css`
          display: grid;
          grid-template-columns: repeat(3, 1fr); ;
        `}
      >
        <NextLink href={`/films`} passHref>
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
          Create Film
        </Typography>
      </Box>
      <Spacer />
      <Divider />
      <Spacer />
      <CreateForm />
    </Box>
  )
}

export default FilmCreatePage
