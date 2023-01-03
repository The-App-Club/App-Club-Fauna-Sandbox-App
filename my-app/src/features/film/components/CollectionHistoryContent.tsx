/** @jsxImportSource @emotion/react */

import NextLink from 'next/link'

import { css } from '@emotion/react'
import { Box, Typography } from '@mui/joy'
import { Link } from '@mui/joy'

import { FallbackLoading } from '@/components/fallback/FallbackLoading'
import { FaunaBackendCollectionHistoryResponse } from '@/types/response'
import { formatRelativeTime, yyyymmddhhmmss } from '@/utils/dateUtil'

const CollectionHistoryContent = ({
  data,
}: {
  data: FaunaBackendCollectionHistoryResponse[] | null | undefined
}) => {
  if (!data) {
    return <FallbackLoading />
  }

  if (data.length === 0) {
    // for visualized
    return <FallbackLoading />
  }

  return (
    <Box className={`flex flex-col gap-2`}>
      {data.map((item, index) => {
        const { action, document, ts } = item
        return (
          <Box
            key={index}
            className={`flex items-center justify-between gap-2`}
          >
            <Box
              css={css`
                display: flex;
                align-items: center;
                gap: 0.5rem;
              `}
            >
              <Typography component={'b'} className={`line-clamp-1`}>
                {action}
              </Typography>
              <Typography>{yyyymmddhhmmss(ts / 1000)}</Typography>
              <Typography>{formatRelativeTime(ts / 1000)}</Typography>
              <NextLink href={`/films/${document.value.id}`} passHref>
                <Link>{`#${document.value.id}`}</Link>
              </NextLink>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default CollectionHistoryContent
