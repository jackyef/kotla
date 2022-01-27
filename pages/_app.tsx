import type { AppProps } from 'next/app'
import { CssBaseline, GeistProvider } from '@geist-ui/core'
import { Layout } from '@/components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GeistProvider>
  )
}

export default MyApp
