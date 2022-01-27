import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, GeistProvider } from '@geist-ui/core'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  )
}

export default MyApp
