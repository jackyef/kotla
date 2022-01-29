import type { AppProps } from 'next/app'
import { Layout } from '@/components/Layout'
import '@/styles/tailwind.css'
import { KotlaProvider } from '@/contexts/Kotla'
import { Toaster } from 'react-hot-toast'

import { toastOptions } from '@/lib/toast'
import Head from 'next/head'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <KotlaProvider>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-0RT1WW0W2K"
          ></Script>
          <Head>
            {/* Global site tag (gtag.js) - Google Analytics */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-0RT1WW0W2K');`
              }}
            ></script>
          </Head>
        </>
      )}
      <Toaster gutter={32} toastOptions={toastOptions} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </KotlaProvider>
  )
}

export default MyApp
