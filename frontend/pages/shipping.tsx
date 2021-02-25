import dynamic from 'next/dynamic'
import * as ShippingPage from '@app-shipping/Shipping'

export default dynamic(() => Promise.resolve(ShippingPage.Shipping), {
  ssr: false,
})
