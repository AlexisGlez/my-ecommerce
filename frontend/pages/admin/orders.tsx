import dynamic from 'next/dynamic'
import * as OrdersPage from '@app-orders/Orders'

export default dynamic(() => Promise.resolve(OrdersPage.Orders), {
  ssr: false,
})
