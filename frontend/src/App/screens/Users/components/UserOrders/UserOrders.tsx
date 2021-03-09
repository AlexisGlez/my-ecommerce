import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Icon, Text } from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'

import { Spinner } from '@app-shared/components/Spinner'
import { ErrorMessage } from '@app-shared/components/ErrorMessage'
import { Link } from '@app-shared/components/Link'
import { Config } from '@app-shared/Config'
import { formatDate } from '@app-shared/utils/formatDate'
import { formatNumber } from '@app-shared/utils/formatNumber'

interface UserOrdersProps {
  state: 'loading' | 'error' | 'success'
  userOrders: Array<OrderDetails>
  errorMessage: string
}

export const UserOrders: React.FC<UserOrdersProps> = ({ state, userOrders, errorMessage }) => {
  if (state === 'loading') {
    return <Spinner />
  }

  if (state === 'error') {
    return <ErrorMessage message={errorMessage} />
  }

  if (userOrders.length === 0) {
    return <Text fontSize="lg">You have 0 orders.</Text>
  }

  return (
    <Table variant="simple">
      <TableCaption>User Orders</TableCaption>
      <Thead>
        <Tr>
          <Th textAlign="center">Id</Th>
          <Th textAlign="center">Date</Th>
          <Th textAlign="center">Total</Th>
          <Th textAlign="center">Paid</Th>
          <Th textAlign="center">Delivered</Th>
          <Th textAlign="center">Details</Th>
        </Tr>
      </Thead>
      <Tbody>
        {userOrders.map((order) => (
          <Tr key={order._id}>
            <Td textAlign="center" paddingX="1rem">
              {order._id}
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
              <Link
                href={Config.Routes.order(order._id)}
                justifyContent="center"
                textDecoration="underline"
              >
                Details
              </Link>
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th textAlign="center">Id</Th>
          <Th textAlign="center">Date</Th>
          <Th textAlign="center">Total</Th>
          <Th textAlign="center">Paid</Th>
          <Th textAlign="center">Delivered</Th>
          <Th textAlign="center">Details</Th>
        </Tr>
      </Tfoot>
    </Table>
  )
}
