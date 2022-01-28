import type { AppProps } from 'next/app'
import { Layout } from '@/components/Layout'
import '@/styles/tailwind.css'
import { KotlaProvider } from '@/contexts/Kotla'
import { Toaster } from 'react-hot-toast'

import { toastOptions } from '@/lib/toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <KotlaProvider>
      <Toaster gutter={32} toastOptions={toastOptions} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </KotlaProvider>
  )
}

export default MyApp
