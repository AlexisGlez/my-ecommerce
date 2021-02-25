import { Fragment } from 'react'
import { Heading, VStack, Button, Grid, GridItem, Text, Image, Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { CheckoutSteps } from '@app-shared/components/CheckoutSteps'
import { Link } from '@app-shared/components/Link'
import { TableRow } from '@app-shared/components/TableRow'
import { stackDivider, divider, dividerColor } from '@app-shared/components/Divider'
import { Config } from '@app-shared/Config'
import { CartStore } from '@app-shared/stores/CartStore'

import { UserInfo } from './components/UserInfo'

function formatNumber(num: number) {
  return `$${(Math.round(num * 100) / 100).toFixed(2)}`
}

interface CheckoutProps {}

export const Checkout: React.FC<CheckoutProps> = () => {
  const shipping = CartStore.useShippingAddress()
  const payment = CartStore.usePaymentMethod()
  const cartItems = CartStore.useGetCartItems()
  const router = useRouter()

  if (!shipping.address) {
    router.replace(Config.Routes.shipping())
    return null
  }

  if (!payment.method) {
    router.replace(Config.Routes.payment())
    return null
  }

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0)
  const shippingPrice = subtotal > 100 ? 0 : 10
  const taxPrice = subtotal * 0.15
  const totalPrice = subtotal + shippingPrice + taxPrice

  const placeOrder = () => {}

  return (
    <>
      <VStack margin="0 auto" maxWidth="500px" alignItems="start" spacing="1.5rem">
        <CheckoutSteps page="checkout" />
      </VStack>
      <Grid mt="1rem" templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(12, 1fr)' }} gap={6}>
        <GridItem colSpan={{ base: 1, lg: 8 }}>
          <UserInfo
            title="Shipping Address"
            body={`${shipping.address}, ${shipping.city} ${shipping.postalCode}, ${shipping.country}`}
          />
          <UserInfo title="Payment Method" body={payment.method} />
          <Heading as="h2" textAlign="start" fontSize="xl" mb="1rem">
            Items
          </Heading>
          {cartItems.map((item, index) => (
            <Fragment key={item.product._id}>
              <Flex justifyContent="space-between" alignItems="center">
                <Image width="5rem" src={item.product.image} alt={item.product.description} />
                <Link
                  href={Config.Routes.product(item.product._id)}
                  fontWeight="semibold"
                  fontSize="lg"
                  mt={{ base: '0.5rem', lg: 0 }}
                  width={{ base: 'auto', lg: '40%' }}
                  textAlign={{ base: 'center', lg: 'start' }}
                >
                  {item.product.name}
                </Link>
                <Text mt={{ base: '0.5rem', lg: 0 }}>
                  {item.quantity} x ${item.product.price} ={' $'}
                  {(item.quantity * item.product.price).toFixed(2)}
                </Text>
              </Flex>
              {index < cartItems.length - 1 && divider}
            </Fragment>
          ))}
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 4 }}>
          <VStack divider={stackDivider} borderWidth="1px" borderColor={dividerColor}>
            <Heading as="h2" textAlign="start" fontSize="xl" p="0.5rem 1rem">
              Order Summary
            </Heading>
            <TableRow title="Items" value={formatNumber(subtotal)} />
            <TableRow title="Shipping" value={formatNumber(shippingPrice)} />
            <TableRow title="Tax" value={formatNumber(taxPrice)} />
            <TableRow title="Total" value={formatNumber(totalPrice)} />
            <TableRow
              value={
                <Button width="100%" textTransform="uppercase" onClick={placeOrder}>
                  Place Order
                </Button>
              }
            />
          </VStack>
        </GridItem>
      </Grid>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}
