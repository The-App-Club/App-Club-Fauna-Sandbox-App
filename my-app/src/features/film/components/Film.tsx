/** @jsxImportSource @emotion/react */

import NextLink from 'next/link'

import { css } from '@emotion/react'
import { Box, Button, Link, Typography } from '@mui/joy'
import { ArrowLeft } from 'phosphor-react'

import useFauna from '@/libs/useFauna'

const FilmPage = () => {
  const { client } = useFauna('shows')

  const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
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
          Focused Film
        </Typography>
        <Button variant='solid' color='primary' onClick={handleEdit}>
          Edit Film
        </Button>
      </Box>
    </Box>
  )
}

export default FilmPage
