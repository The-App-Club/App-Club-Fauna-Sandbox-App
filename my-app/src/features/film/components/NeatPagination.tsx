/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Box, Button, Typography } from '@mui/joy'

import Spacer from '@/components/ui/Spacer'
import useNeatPagination from '@/features/film/hooks/useNeatPagination'

const NeatPagination = () => {
  const { prevPage, nextPage, activeNeatPagination } = useNeatPagination()

  console.log(`[NeatPagination]`, activeNeatPagination)
  return (
    <Box component={'aside'} className={'mx-auto mt-24 w-full max-w-lg'}>
      <Box
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <Typography
          component={'h1'}
          level='h1'
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
          `}
        >
          Neat Pagination
        </Typography>
      </Box>
      <Spacer />
      <Box
        css={css`
          display: flex;
          align-items: center;
          gap: 0.5rem;
        `}
      >
        <Button variant='solid' color='neutral' onClick={prevPage}>
          Prev Page
        </Button>
        <Button variant='solid' color='neutral' onClick={nextPage}>
          Next Page
        </Button>
      </Box>
    </Box>
  )
}

export default NeatPagination
