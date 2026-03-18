import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="id">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#0D9488" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
