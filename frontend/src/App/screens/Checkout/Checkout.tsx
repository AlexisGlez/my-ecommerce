import Head from 'next/head'
import { useState } from 'react'
import { VStack, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { CheckoutSteps } from '@app-shared/components/CheckoutSteps'
import { OrderDetails } from '@app-shared/components/OrderDetails'
import { ErrorMessage } from '@app-shared/components/ErrorMessage'
import { Spinner } from '@app-shared/components/Spinner'
import { Config } from '@app-shared/Config'
import { CartStore } from '@app-shared/stores/CartStore'
import { UserStore } from '@app-shared/stores/UserStore'
import { OrderStore } from '@app-shared/stores/OrderStore'

interface CheckoutProps {}

export const Checkout: React.FC<CheckoutProps> = () => {
  const [isLoading, setLoading] = useState(false)
  const shipping = CartStore.useShippingAddress()
  const payment = CartStore.usePaymentMethod()
  const cartItems = CartStore.useGetCartItems()
  const currentUser = UserStore.useCurrentUser()
  const currentCart = CartStore.useGetCurrentCart()
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  if (!currentUser) {
    router.replace(Config.Routes.login())
    return <Spinner />
  }

  if (!shipping.address) {
    router.replace(Config.Routes.shipping())
    return <Spinner />
  }

  if (!payment.method) {
    router.replace(Config.Routes.payment())
    return <Spinner />
  }

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0)
  const shippingPrice = subtotal > 100 ? 0 : 10
  const taxPrice = subtotal * 0.15
  const totalPrice = subtotal + shippingPrice + taxPrice

  const placeOrder = async () => {
    setLoading(true)
    const response = await OrderStore.createOrder(
      currentUser,
      currentCart,
      taxPrice,
      shippingPrice,
      totalPrice,
    )
    setLoading(false)

    if (!response || response.error || response.state === 'error' || !response.order) {
      setErrorMessage(
        response.error ?? 'An error occured while placing the order. Please try again later.',
      )
    } else {
      router.push(Config.Routes.order(response.order._id))
    }
  }

  return (
    <>
      <Head>
        <title>My Ecommerce | Checkout</title>
        <meta name="description" content="Complete your purchase here." />
        <meta name="keywords" content="checkout" />
      </Head>
      {errorMessage && (
        <Box mb="1rem">
          <ErrorMessage message={errorMessage} />
        </Box>
      )}
      <VStack margin="0 auto" maxWidth="500px" alignItems="start" spacing="1.5rem">
        <CheckoutSteps page="checkout" />
      </VStack>
      <OrderDetails
        shipping={shipping}
        shippingPrice={shippingPrice}
        taxPrice={taxPrice}
        totalPrice={totalPrice}
        items={cartItems}
        paymentMethod={payment.method}
        placeOrderButton={{ isLoading, onClick: placeOrder }}
      />
    </>
  )
}
