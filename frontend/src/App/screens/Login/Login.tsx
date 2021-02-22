import { Heading, VStack, Button, Text } from '@chakra-ui/react'
import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router'

import { Link } from '@app-shared/components/Link'
import { UserStore } from '@app-stores/UserStore'
import { Config } from '@app-shared/Config'

import { Input } from './components/Input'

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setLoading] = useState(false)

  const router = useRouter()
  const currentUser = UserStore.useCurrentUser()

  useEffect(() => {
    if (!currentUser) {
      return
    }

    if (router.query.redirect) {
      router.replace(router.query.redirect as string)
    } else {
      router.replace(Config.Routes.home())
    }
  }, [router, currentUser])

  const performLogin = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault()

    setEmailError('')
    setPasswordError('')

    let isValid = true
    if (!email) {
      setEmailError('Email is required.')
      isValid = false
    }

    if (!password) {
      setPasswordError('Password is required.')
      isValid = false
    }

    if (!isValid) {
      return
    }

    setLoading(true)
    const response = await UserStore.login(email, password)
    setLoading(false)

    if (!response || response.error || response.state === 'error') {
      setEmailError('Email or Password are incorrect.')
      setPasswordError('Email or Password are incorrect.')
    } else {
      console.log(response)
    }
  }

  return (
    <VStack
      margin="0 auto"
      maxWidth="500px"
      alignItems="start"
      spacing="1.5rem"
      as="form"
      onSubmit={performLogin}
    >
      <Heading as="h1" textAlign="start">
        Sign In
      </Heading>
      <Input
        id="email"
        isInvalid={Boolean(emailError)}
        label="Email address"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        helperText="Your email will never be shared."
        error={emailError}
      />
      <Input
        id="password"
        isInvalid={Boolean(passwordError)}
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={passwordError}
      />
      <Button type="submit" isLoading={isLoading} disabled={Boolean(currentUser)}>
        Submit
      </Button>
      <Text fontSize="md" mt="1rem">
        New Customer?{' '}
        <Link
          href={Config.Routes.formatPossibleRedirect(
            Config.Routes.register(),
            router.query.redirect as string | undefined,
          )}
          fontWeight="semibold"
          display="inline-block"
        >
          Register
        </Link>
      </Text>
    </VStack>
  )
}
