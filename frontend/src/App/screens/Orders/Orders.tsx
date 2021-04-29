import Head from 'next/head'
import { useState, useEffect } from 'react'
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { FaTimes, FaEdit } from 'react-icons/fa'

import { Config } from '@app-src/shared/Config'
import { ErrorMessage } from '@app-shared/components/ErrorMessage'
import { Spinner } from '@app-shared/components/Spinner'
import { useRedirect } from '@app-shared/hooks/useRedirect'
import { UserStore } from '@app-stores/UserStore'
import { OrderStore } from '@app-shared/stores/OrderStore'
import { Link } from '@app-shared/components/Link'
import { formatDate } from '@app-shared/utils/formatDate'
import { formatNumber } from '@app-shared/utils/formatNumber'

interface OrdersProps {}

export const Orders: React.FC<OrdersProps> = () => {
  const [isLoading, setLoading] = useState(false)
  const [ordersError, setOrdersError] = useState('')
  const [orders, setOrders] = useState<Array<OrderDetails>>([])
  const currentUser = UserStore.useCurrentUser()
  const redirect = useRedirect(Config.Routes.login())

  async function getAllOrders() {
    setLoading(true)

    const response = await OrderStore.getAllOrders(currentUser!)

    if (!response || response.error || response.state === 'error' || !response.orders) {
      setOrdersError(
        response.error ?? 'An error occured while getting all orders. Please try again later.',
      )
    } else {
      setOrders(response.orders)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      return
    }

    getAllOrders()
  }, [currentUser])

  if (!currentUser || !currentUser.isAdmin) {
    redirect()
    return <Spinner />
  }

  return (
    <>
      <Head>
        <title>My Ecommerce | Admin | Orders</title>
        <meta name="description" content="Admin orders" />
        <meta name="keywords" content="admin,orders" />
      </Head>
      {ordersError && <Box mb="1rem">{ordersError && <ErrorMessage message={ordersError} />}</Box>}
      <Heading as="h1" mb="1rem">
        Orders
      </Heading>
      {isLoading ? (
        <Spinner />
      ) : (
        <Table variant="simple">
          <TableCaption>Orders</TableCaption>
          <Thead>
            <Tr>
              <Th textAlign="center">Id</Th>
              <Th textAlign="center">User</Th>
              <Th textAlign="center">Date</Th>
              <Th textAlign="center">Total</Th>
              <Th textAlign="center">Paid</Th>
              <Th textAlign="center">Delivered</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order._id}>
                <Td textAlign="center" paddingX="1rem">
                  {order._id}
                </Td>
                <Td textAlign="center" paddingX="1rem">
                  {order.user.name}
                </Td>
                <Td textAlign="center" paddingX="1rem">
                  {formatDate(order.createdAt)}
                </Td>
                <Td textAlign="center" paddingX="1rem">
                  {formatNumber(order.totalPrice)}
                </Td>
                <Td textAlign="center" paddingX="1rem">
                  {order.isPaid ? formatDate(order.paidAt) : <Icon as={FaTimes} fill="red.500" />}
                </Td>
                <Td textAlign="center" paddingX="1rem">
                  {order.isDelivered ? (
                    formatDate(order.deliveredAt)
                  ) : (
                    <Icon as={FaTimes} fill="red.500" />
                  )}
                </Td>
                <Td textAlign="center" paddingX="1rem">
                  <Flex alignItems="center" justifyContent="center">
                    <Link
                      href={Config.Routes.order(order._id)}
                      role="button"
                      justifyContent="center"
                      fontSize="1.5rem"
                    >
                      <Icon as={FaEdit} fill="teal.500" />
                    </Link>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th textAlign="center">Id</Th>
              <Th textAlign="center">User</Th>
              <Th textAlign="center">Date</Th>
              <Th textAlign="center">Total</Th>
              <Th textAlign="center">Paid</Th>
              <Th textAlign="center">Delivered</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Tfoot>
        </Table>
      )}
    </>
  )
}
