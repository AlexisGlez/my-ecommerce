import { useState, useEffect, Dispatch, SetStateAction } from 'react'

import { UserForm } from '@app-shared/components/UserForm'
import { UserStore } from '@app-stores/UserStore'
import { useRedirect } from '@app-shared/hooks/useRedirect'

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  const [isLoading, setLoading] = useState(false)

  const currentUser = UserStore.useCurrentUser()
  const redirect = useRedirect()

  useEffect(() => {
    if (!currentUser) {
      return
    }

    redirect()
  }, [currentUser, redirect])

  const performLogin = async (
    email: string,
    password: string,
    setEmailError: Dispatch<SetStateAction<string>>,
    setPasswordError: Dispatch<SetStateAction<string>>,
  ) => {
    setLoading(true)
    const response = await UserStore.login(email, password)
    setLoading(false)

    if (!response || response.error || response.state === 'error') {
      setEmailError('Incorrect email or password.')
      setPasswordError('Incorrect email or password.')
    } else {
      redirect()
    }
  }

  return <UserForm type="login" onLogin={performLogin} isLoading={isLoading} />
}
