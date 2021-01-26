/// <reference path="./App.d.ts" />

import { useEffect } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ChakraProvider, Box } from '@chakra-ui/react'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { theme } from './theme'
import { Cookies } from '@app-shared/Cookies'
import { CartStore } from '@app-stores/CartStore'

export function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const cookies = Cookies.getAll()

    if (cookies[Cookies.Cart]) {
      CartStore.initialize(cookies[Cookies.Cart])
    }
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main>
        <Box my="6rem" maxW="7xl" px="1rem" mx="auto" textAlign="center">
          <Component {...pageProps} />
        </Box>
      </main>
      <Footer />
    </ChakraProvider>
  )
}
