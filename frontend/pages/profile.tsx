import dynamic from 'next/dynamic'
import * as ProfilePage from '@app-profile/Profile'

export default dynamic(() => Promise.resolve(ProfilePage.Profile), {
  ssr: false,
})
