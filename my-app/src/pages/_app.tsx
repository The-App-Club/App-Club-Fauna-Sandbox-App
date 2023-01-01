import '@/styles/index.scss'
import type { AppProps } from 'next/app'

import { CssBaseline } from '@mui/joy'
import { CssVarsProvider } from '@mui/joy/styles'
import { MutableSnapshot, RecoilRoot } from 'recoil'

import theme from '@/config/theme'
import { FaunaDBQueryManager } from '@/fauna/config'
import { faunaState } from '@/stores/fauna'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </CssVarsProvider>
  )
}

const doInitializeState = (mutableSnapshot: MutableSnapshot) => {
  const { set } = mutableSnapshot
  set(faunaState, (prevState) => {
    return {
      ...prevState,
      client: new FaunaDBQueryManager().getClient(),
    }
  })
}

const BebopApp = (props: AppProps) => {
  return (
    <RecoilRoot initializeState={doInitializeState}>
      <MyApp {...props} />
    </RecoilRoot>
  )
}
export default BebopApp
