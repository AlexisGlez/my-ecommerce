import dynamic from 'next/dynamic'
import * as CartPage from '@app-cart/Cart'

export default dynamic(() => Promise.resolve(CartPage.Cart), {
  ssr: false,
})
