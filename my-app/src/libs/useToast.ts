import { css, cx } from '@emotion/css'
import toast from 'react-hot-toast'

const useToast = () => {
  const successToast = (message: string) => {
    toast.success(message, {
      className: cx(
        css`
          font-weight: 700;
          font-size: 0.875rem; /* 14px */
          line-height: 1.25rem; /* 20px */
          font-family: 'Noto Sans JP', sans-serif;
        `
      ),
    })
  }

  const errorToast = (message: string) => {
    toast.error(message, {
      className: cx(
        css`
          font-weight: 700;
          font-size: 0.875rem; /* 14px */
          line-height: 1.25rem; /* 20px */
          font-family: 'Noto Sans JP', sans-serif;
        `
      ),
    })
  }

  return {
    successToast,
    errorToast,
  }
}

export default useToast
