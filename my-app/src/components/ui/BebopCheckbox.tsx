/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Box, Checkbox, FormControl, FormLabel, Tooltip } from '@mui/joy'
import { Asterisk } from 'phosphor-react'

import Spacer from '@/components/ui/Spacer'

import type { FieldValues, UseFormRegister } from 'react-hook-form'

const BebopCheckbox = ({
  name = `name`,
  labelName = `お名前`,
  checkLabelName = ``,
  tooltipText = `お名前のツールチップ`,
  autoFocus = false,
  required = false,
  disabled = false,
  defaultValue = false,
  register,
  errors,
}: {
  name?: string
  labelName?: string
  checkLabelName?: string
  tooltipText?: string
  autoFocus?: boolean
  required?: boolean
  disabled?: boolean
  defaultValue?: boolean
  register: UseFormRegister<FieldValues>
  errors: any
}) => {
  return (
    <FormControl>
      <Box
        css={css`
          display: flex;
          align-items: center;
          gap: 0.5rem;
        `}
      >
        <Tooltip title={tooltipText} arrow placement='top'>
          <FormLabel
            css={css`
              font-weight: 700;
            `}
          >
            {labelName}
          </FormLabel>
        </Tooltip>
        {required && (
          <Asterisk
            color='red'
            size={14}
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          />
        )}
      </Box>
      <Spacer height='0.5rem' />
      <Checkbox
        color='neutral'
        defaultChecked={defaultValue}
        label={checkLabelName}
        {...register(name)}
      />
    </FormControl>
  )
}

export default BebopCheckbox
