import dynamic from 'next/dynamic'
import * as CheckoutPage from '@app-checkout/Checkout'

export default dynamic(() => Promise.resolve(CheckoutPage.Checkout), {
  ssr: false,
})
