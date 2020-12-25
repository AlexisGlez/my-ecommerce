/// <reference path="./App.d.ts" />

import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { theme } from './theme'

export function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  )
}
