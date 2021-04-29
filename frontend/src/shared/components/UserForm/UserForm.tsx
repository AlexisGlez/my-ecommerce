import Head from 'next/head'
import { useState, FormEvent, Dispatch, SetStateAction } from 'react'
import { Heading, VStack, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Link } from '@app-shared/components/Link'
import { Input } from '@app-shared/components/Input'
import { Config } from '@app-shared/Config'

interface UserFormProps {
  type: 'login' | 'register' | 'profile'
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
  onProfileUpdate?: (name: string, password: string) => void
  isLoading: boolean
  defaultEmail?: string
  defaultName?: string
}

export const UserForm: React.FC<UserFormProps> = ({
  type,
  isLoading,
  onLogin,
  onRegister,
  onProfileUpdate,
  defaultName,
  defaultEmail,
}) => {
  const [email, setEmail] = useState(defaultEmail || '')
  const [password, setPassword] = useState('')
  const [name, setName] = useState(defaultName || '')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const router = useRouter()

  const isProfile = type === 'profile'
  const isRegister = type === 'register'
  const isLogin = type === 'login'
  const title = isProfile ? 'User Profile' : isRegister ? 'Sign Up' : 'Sign In'

  const onFormCompleted = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault()

    setNameError('')
    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')

    let isValid = true

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()
    const trimmedConfirmPassword = confirmPassword.trim()

    if (!trimmedEmail) {
      setEmailError('Email is required.')
      isValid = false
    }

    if (!trimmedPassword) {
      setPasswordError('Password is required.')
      isValid = false
    }

    if (!isLogin) {
      if (!trimmedName) {
        setNameError('Name is required.')
        isValid = false
      }

      if (!trimmedConfirmPassword) {
        setConfirmPasswordError('Please confirm your password.')
        isValid = false
      }

      if (trimmedPassword !== trimmedConfirmPassword) {
        setPasswordError('Passwords do not match.')
        setConfirmPasswordError('Passwords do not match.')
        isValid = false
      }
    }

    if (!isValid) {
      return
    }

    if (onRegister != null) {
      onRegister(trimmedName, trimmedEmail, trimmedPassword, setEmailError)
    } else if (onLogin != null) {
      onLogin(trimmedEmail, trimmedPassword, setEmailError, setPasswordError)
    } else if (onProfileUpdate != null) {
      onProfileUpdate(trimmedName, trimmedPassword)
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
      <Head>
        <title>My Ecommerce | {title}</title>
        <meta name="description" content="Your info..." />
        <meta name="keywords" content="user" />
      </Head>
      <Heading as="h1" textAlign="start">
        {title}
      </Heading>
      {!isLogin && (
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
        disabled={Boolean(defaultEmail)}
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
      {!isLogin && (
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
      <Button type="submit" isLoading={isLoading} disabled={isLoading}>
        {isProfile ? 'Update' : title}
      </Button>
      {!isProfile && (
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
      )}
    </VStack>
  )
}
