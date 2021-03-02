import dynamic from 'next/dynamic'
import * as OrderPage from '@app-order/Order'

export default dynamic(() => Promise.resolve(OrderPage.Order), {
  ssr: false,
})
