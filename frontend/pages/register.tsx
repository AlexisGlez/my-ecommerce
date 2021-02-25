import dynamic from 'next/dynamic'
import * as RegisterPage from '@app-register/Register'

export default dynamic(() => Promise.resolve(RegisterPage.Register), {
  ssr: false,
})
