/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Box, FormControl, FormLabel, TextField, Tooltip } from '@mui/joy'
import { Asterisk } from 'phosphor-react'

import Spacer from '@/components/ui/Spacer'

import type { FieldValues, UseFormRegister } from 'react-hook-form'

const BebopTextField = ({
  name = `name`,
  type = `text`,
  labelName = `お名前`,
  tooltipText = `お名前のツールチップ`,
  placeholder = `山田太郎`,
  autoFocus = false,
  required = false,
  disabled = false,
  defaultValue = ``,
  register,
  errors,
}: {
  name?: string
  type?: string
  labelName?: string
  tooltipText?: string
  placeholder?: string
  autoFocus?: boolean
  required?: boolean
  disabled?: boolean
  defaultValue?: string
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
      <TextField
        id={`${name}-textfield`}
        disabled={disabled}
        placeholder={placeholder}
        autoFocus={autoFocus}
        type={type}
        defaultValue={defaultValue}
        {...register(name, {
          valueAsNumber: type === 'number', // https://stackoverflow.com/a/70998738/15972569
        })}
        error={!!errors[name]}
        helperText={errors[name] ? errors[name].message : ''}
      />
    </FormControl>
  )
}

export default BebopTextField
