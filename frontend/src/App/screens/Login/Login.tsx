import { Heading, VStack, Button, Text } from '@chakra-ui/react'
import { useState } from 'react'

import { Link } from '@app-shared/components/Link'
import { UserStore } from '@app-stores/UserStore'

import { Input } from './components/Input'

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setLoading] = useState(false)

  const performLogin = async () => {
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
    <VStack margin="0 auto" maxWidth="500px" alignItems="start" spacing="1.5rem">
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
      <Button type="submit" isLoading={isLoading} onClick={performLogin}>
        Submit
      </Button>
      <Text fontSize="md" mt="1rem">
        New Customer?{' '}
        <Link href="/signup" fontWeight="semibold" display="inline-block">
          Register
        </Link>
      </Text>
    </VStack>
  )
}
