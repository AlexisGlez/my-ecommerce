import { useState, Dispatch, SetStateAction } from 'react'

import { UserForm } from '@app-shared/components/UserForm'
import { UserStore } from '@app-stores/UserStore'
import { useRedirect } from '@app-shared/hooks/useRedirect'

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
  const [isLoading, setLoading] = useState(false)
  const redirect = useRedirect()

  const performRegister = async (
    name: string,
    email: string,
    password: string,
    setEmailError: Dispatch<SetStateAction<string>>,
  ) => {
    setLoading(true)
    const response = await UserStore.register(name, email, password)
    setLoading(false)

    if (!response || response.error || response.state === 'error') {
      if ((response.error as any)?.message) {
        setEmailError((response.error as any)?.message)
      } else {
        setEmailError('An account with this email already exists. Please use another email.')
      }
    } else {
      redirect()
    }
  }

  return <UserForm onRegister={performRegister} isLoading={isLoading} />
}
