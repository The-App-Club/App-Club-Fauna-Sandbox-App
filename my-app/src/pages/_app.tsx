import '@/styles/index.scss'
import type { AppProps } from 'next/app'

import { CssBaseline } from '@mui/joy'
import { CssVarsProvider } from '@mui/joy/styles'
import { RecoilRoot } from 'recoil'

import theme from '@/config/theme'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </CssVarsProvider>
  )
}

const BebopApp = (props: AppProps) => {
  return (
    <RecoilRoot>
      <MyApp {...props} />
    </RecoilRoot>
  )
}
export default BebopApp
