import dynamic from 'next/dynamic'
import * as UsersPage from '@app-users/Users'

export default dynamic(() => Promise.resolve(UsersPage.Users), {
  ssr: false,
})
