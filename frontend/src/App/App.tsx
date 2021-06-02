/// <reference path="./App.d.ts" />

import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ChakraProvider, Box } from '@chakra-ui/react'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { theme } from './theme'
import { Cookies } from '@app-shared/Cookies'
import { CartStore } from '@app-stores/CartStore'
import { UserStore } from '@app-src/shared/stores/UserStore'

function initializeState() {
  const cookies = Cookies.getAll()

  if (!cookies) {
    return
  }

  if (cookies[Cookies.Cart]) {
    CartStore.initialize(cookies[Cookies.Cart])
  }

  if (cookies[Cookies.User]) {
    UserStore.initialize(cookies[Cookies.User])
  }
}

initializeState()

export function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main>
        <Box my="7rem" maxW="7xl" px="1rem" mx="auto" textAlign="center">
          <Component {...pageProps} />
        </Box>
      </main>
      <Footer />
    </ChakraProvider>
  )
}
