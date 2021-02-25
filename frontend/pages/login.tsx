import dynamic from 'next/dynamic'
import * as LoginPage from '@app-login/Login'

export default dynamic(() => Promise.resolve(LoginPage.Login), {
  ssr: false,
})
