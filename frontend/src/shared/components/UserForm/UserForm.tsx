import { useState, FormEvent, Dispatch, SetStateAction } from 'react'
import { Heading, VStack, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Link } from '@app-shared/components/Link'
import { Input } from '@app-shared/components/Input'
import { Config } from '@app-shared/Config'
import { UserStore } from '@app-stores/UserStore'

interface UserFormProps {
  onLogin?: (
    email: string,
    password: string,
    setEmailError: Dispatch<SetStateAction<string>>,
    setPasswordError: Dispatch<SetStateAction<string>>,
  ) => void
  onRegister?: (
    name: string,
    email: string,
    password: string,
    setEmailError: Dispatch<SetStateAction<string>>,
  ) => void
  isLoading: boolean
}

export const UserForm: React.FC<UserFormProps> = ({ isLoading, onLogin, onRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const router = useRouter()
  const currentUser = UserStore.useCurrentUser()

  const isRegister = onRegister != null
  const title = isRegister ? 'Sign Up' : 'Sign In'

  const onFormCompleted = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault()

    setNameError('')
    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')

    let isValid = true

    if (!email) {
      setEmailError('Email is required.')
      isValid = false
    }

    if (!password) {
      setPasswordError('Password is required.')
      isValid = false
    }

    if (isRegister) {
      if (!name) {
        setNameError('Name is required.')
        isValid = false
      }

      if (!confirmPassword) {
        setConfirmPasswordError('Please confirm your password.')
        isValid = false
      }

      if (password !== confirmPassword) {
        setPasswordError('Passwords do not match.')
        setConfirmPasswordError('Passwords do not match.')
        isValid = false
      }
    }

    if (!isValid) {
      return
    }

    if (onRegister != null) {
      onRegister(name, email, password, setEmailError)
    } else if (onLogin != null) {
      onLogin(email, password, setEmailError, setPasswordError)
    }
  }

  return (
    <VStack
      margin="0 auto"
      maxWidth="500px"
      alignItems="start"
      spacing="1.5rem"
      as="form"
      onSubmit={onFormCompleted}
    >
      <Heading as="h1" textAlign="start">
        {title}
      </Heading>
      {isRegister && (
        <Input
          id="name"
          isInvalid={Boolean(nameError)}
          label="Name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={nameError}
        />
      )}
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
      {isRegister && (
        <Input
          id="confirmPassword"
          isInvalid={Boolean(confirmPasswordError)}
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={confirmPasswordError}
        />
      )}
      <Button type="submit" isLoading={isLoading} disabled={Boolean(currentUser)}>
        {title}
      </Button>
      <Text fontSize="md" mt="1rem">
        {isRegister ? 'Have an Account' : 'New Customer'}
        {'? '}
        <Link
          href={Config.Routes.formatPossibleRedirect(
            isRegister ? Config.Routes.login() : Config.Routes.register(),
            router.query.redirect as string | undefined,
          )}
          fontWeight="semibold"
          display="inline-block"
        >
          {isRegister ? 'Sign In' : 'Sign Up'}
        </Link>
      </Text>
    </VStack>
  )
}