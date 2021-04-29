import Head from 'next/head'
import { Grid, Flex, GridItem, Heading, Alert, AlertIcon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Link } from '@app-shared/components/Link'
import { divider } from '@app-shared/components/Divider'
import { Config } from '@app-shared/Config'
import { CartStore } from '@app-stores/CartStore'

import { CartItem } from './components/CartItem'
import { SubtotalBox } from './components/SubtotalBox'

interface CartProps {}

export const Cart: React.FC<CartProps> = () => {
  const router = useRouter()
  const cartItems = CartStore.useGetCartItems()

  const onCheckoutClick = useCallback(() => {
    router.push(Config.Routes.checkoutProcess())
  }, [router])

  if (cartItems.length === 0) {
    return (
      <Alert status="warning">
        <AlertIcon />
        Looks like your cart is empty!
        <Link href={Config.Routes.home()} ml="1ch" textDecoration="underline">
          Add products to your cart.
        </Link>
      </Alert>
    )
  }

  return (
    <>
      <Head>
        <title>My Ecommerce | Cart</title>
        <meta name="description" content="Your cart" />
        <meta name="keywords" content="cart" />
      </Head>
      <Heading as="h1" textAlign="start">
        Shopping Cart
      </Heading>
      <Grid mt="1rem" templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(12, 1fr)' }} gap={6}>
        <GridItem colSpan={{ base: 1, lg: 8 }}>
          {cartItems.map((item) => (
            <Flex key={item.product._id} flexDirection="column" mb="1rem">
              <CartItem {...item} />
              {divider}
            </Flex>
          ))}
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 4 }}>
          <SubtotalBox
            subtotal={cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0)}
            totalItems={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            onCheckoutClick={onCheckoutClick}
          />
        </GridItem>
      </Grid>
    </>
  )
}
