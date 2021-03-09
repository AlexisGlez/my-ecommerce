import dynamic from 'next/dynamic'
import * as EditUserPage from '@app-edit-user/EditUser'

export default dynamic(() => Promise.resolve(EditUserPage.EditUser), {
  ssr: false,
})
