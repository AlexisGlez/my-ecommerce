import { Fragment } from 'react'
import {
  Heading,
  VStack,
  Button,
  Grid,
  GridItem,
  Text,
  Image,
  Flex,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'

import { Link } from '@app-shared/components/Link'
import { TableRow } from '@app-shared/components/TableRow'
import { stackDivider, divider, dividerColor } from '@app-shared/components/Divider'
import { Config } from '@app-shared/Config'

import { UserInfo } from './components/UserInfo'

function formatNumber(num: number) {
  return `$${(Math.round(num * 100) / 100).toFixed(2)}`
}

interface OrderDetailsProps {
  shipping: ShippingInformation
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  items: Array<{
    product: { _id: string; price: number; name: string; image: string }
    quantity: number
  }>
  paymentMethod: string
  placeOrderButton?: {
    onClick: () => void
    isLoading: boolean
  }
  orderData?: OrderDetails
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  shipping,
  shippingPrice,
  taxPrice,
  totalPrice,
  items,
  paymentMethod,
  placeOrderButton,
  orderData,
}) => {
  const subtotal = items.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0)

  const address = `${shipping.address}, ${shipping.city} ${shipping.postalCode}, ${shipping.country}`

  const User = () => (
    <>
      <Text textAlign="start" my="1rem" fontSize="md">
        <strong>Name:</strong> {orderData?.user.name}
      </Text>
      <Text textAlign="start" my="1rem" fontSize="md">
        <strong>Email:</strong>{' '}
        <a href={`mailto:${orderData?.user.email}`}>{orderData?.user.email}</a>
      </Text>
      <Text textAlign="start" my="1rem" fontSize="md">
        <strong>Address:</strong> {address}
      </Text>
      <Alert status={orderData?.isDelivered ? 'success' : 'error'}>
        <AlertIcon />
        {orderData?.isDelivered ? `Delivered on ${orderData.deliveredAt}` : 'Not delivered yet.'}
      </Alert>
    </>
  )

  const PaymentInformation = () => (
    <>
      <Text textAlign="start" my="1rem" fontSize="md">
        <strong>Method:</strong> {paymentMethod}
      </Text>
      <Alert status={orderData?.isPaid ? 'success' : 'error'}>
        <AlertIcon />
        {orderData?.isPaid ? `Paid on ${orderData.paidAt}` : 'Not paid yet.'}
      </Alert>
    </>
  )

  return (
    <Grid mt="1rem" templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(12, 1fr)' }} gap={6}>
      <GridItem colSpan={{ base: 1, lg: 8 }}>
        <UserInfo title="Shipping Information" body={orderData ? <User /> : address} />
        <UserInfo
          title="Payment Information"
          body={orderData ? <PaymentInformation /> : paymentMethod}
        />
        <Heading as="h2" textAlign="start" fontSize="xl" mb="1rem">
          Items
        </Heading>
        {items.map((item, index) => (
          <Fragment key={item.product._id}>
            <Flex justifyContent="space-between" alignItems="center">
              <Image width="5rem" src={item.product.image} alt={item.product.name} />
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
            {index < items.length - 1 && divider}
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
          {placeOrderButton && (
            <TableRow
              value={
                <Button
                  width="100%"
                  textTransform="uppercase"
                  onClick={placeOrderButton.onClick}
                  isLoading={placeOrderButton.isLoading}
                >
                  Place Order
                </Button>
              }
            />
          )}
        </VStack>
      </GridItem>
    </Grid>
  )
}
