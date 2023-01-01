import Axios from 'axios'

import type { BackendResponse } from '@/types/response'

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_BASE_URL,
  timeout: Number(process.env.NEXT_PUBLIC_AXIOS_FETCH_TIMEOUT),
})

const clampError = (error: any): BackendResponse => {
  const { data } = error.response?.data || { data: { message: error.message } }
  return data
}

axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const niceError = {
      ...error,
      response: {
        ...error.response,
        data: clampError(error),
      },
    }
    return Promise.reject(niceError)
  }
)
