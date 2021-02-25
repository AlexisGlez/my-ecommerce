import dynamic from 'next/dynamic'
import * as PaymentPage from '@app-payment/Payment'

export default dynamic(() => Promise.resolve(PaymentPage.Payment), {
  ssr: false,
})
