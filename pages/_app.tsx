import type { AppProps } from 'next/app'
import { Layout } from '@/components/Layout'
import '@/styles/tailwind.css'
import { KotlaProvider } from '@/contexts/Kotla'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <KotlaProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </KotlaProvider>
  )
}

export default MyApp
