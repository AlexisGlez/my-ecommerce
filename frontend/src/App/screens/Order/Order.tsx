import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Heading, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { OrderDetails } from '@app-shared/components/OrderDetails'
import { Spinner } from '@app-shared/components/Spinner'
import { ErrorMessage } from '@app-shared/components/ErrorMessage'
import { Config } from '@app-shared/Config'
import { UserStore } from '@app-shared/stores/UserStore'
import { OrderStore } from '@app-shared/stores/OrderStore'

interface OrderProps {}

export const Order: React.FC<OrderProps> = () => {
  const [isLoading, setLoading] = useState(false)
  const [isDeliveringOrder, setIsDeliveringOrder] = useState(false)
  const [isPaypalReady, setPaypalReady] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const currentUser = UserStore.useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    async function getOrderDetails() {
      if (!currentUser || !router.query.id) {
        return
      }

      setLoading(true)
      const response = await OrderStore.getOrderById(currentUser, router.query.id as string)

      if (!response || response.error || response.state === 'error' || !response.order) {
        setErrorMessage(
          response.error ?? 'An error occured while getting order details. Please try again later.',
        )
      } else {
        setOrderDetails(response.order)
      }
      setLoading(false)
    }

    getOrderDetails()
  }, [currentUser, router])

  useEffect(() => {
    async function addPaypalScript() {
      const response = await OrderStore.getPaypalClientId()

      if (!response || response.error || response.state === 'error' || !response.paypalId) {
        console.error(response.error ?? 'Unable to get Paypal id.')
      } else {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${response.paypalId}`
        script.async = true
        script.onload = () => {
          setPaypalReady(true)
        }

        document.body.appendChild(script)
      }
    }

    if (!(window as any).paypal) {
      addPaypalScript()
    } else {
      setPaypalReady(true)
    }
  }, [])

  if (!currentUser) {
    router.replace(Config.Routes.login())
    return <Spinner />
  }

  const onSuccessPaymentHandler = async (paymentResult: PaymentResult) => {
    if (!currentUser || !router.query.id) {
      return
    }

    setLoading(true)

    const response = await OrderStore.payOrder(
      currentUser,
      router.query.id as string,
      paymentResult,
    )

    if (!response || response.error || response.state === 'error' || !response.order) {
      setErrorMessage(
        response.error ?? 'An error occured while getting order details. Please try again later.',
      )
    } else {
      setOrderDetails(response.order)
    }

    setLoading(false)
  }

  const deliverOrder = async () => {
    if (!currentUser || !router.query.id) {
      return
    }

    setIsDeliveringOrder(true)

    const response = await OrderStore.deliverOrder(currentUser, router.query.id as string)

    if (!response || response.error || response.state === 'error' || !response.order) {
      setErrorMessage(
        response.error ?? 'An error occured while delivering order. Please try again later.',
      )
    } else {
      setOrderDetails(response.order)
    }

    setIsDeliveringOrder(false)
  }

  return (
    <>
      <Head>
        <title>My Ecommerce | Order Details</title>
        <meta name="description" content="See your order details" />
        <meta name="keywords" content="order,details" />
      </Head>
      {errorMessage && (
        <Box mb="1rem">
          <ErrorMessage message={errorMessage} />
        </Box>
      )}
      <Heading as="h1" textAlign="start">
        Order {router.query.id}
      </Heading>
      {isLoading && <Spinner />}
      {orderDetails && (
        <OrderDetails
          shipping={orderDetails.shippingAddress}
          shippingPrice={orderDetails.shippingPrice}
          taxPrice={orderDetails.taxPrice}
          totalPrice={orderDetails.totalPrice}
          items={orderDetails.orderItems.map((item) => ({
            quantity: item.qty,
            product: {
              _id: item.product,
              image: item.image,
              name: item.name,
              price: item.price,
            },
          }))}
          paymentMethod={orderDetails.paymentMethod}
          orderData={orderDetails}
          onSuccessPaymentHandler={onSuccessPaymentHandler}
          isPaypalReady={isPaypalReady}
          currentUser={currentUser}
          deliverOrderButton={{ onClick: deliverOrder, isLoading: isDeliveringOrder }}
        />
      )}
    </>
  )
}
