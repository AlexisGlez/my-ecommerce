import Head from 'next/head'
import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { Heading, VStack, Button, Checkbox, Box, Alert, AlertIcon } from '@chakra-ui/react'

import { Config } from '@app-src/shared/Config'
import { Input } from '@app-shared/components/Input'
import { ErrorMessage } from '@app-shared/components/ErrorMessage'
import { Spinner } from '@app-shared/components/Spinner'
import { GoBack } from '@app-shared/components/Link'
import { UserStore } from '@app-stores/UserStore'
import { useRedirect } from '@app-shared/hooks/useRedirect'

interface EditUserProps {}

export const EditUser: React.FC<EditUserProps> = () => {
  const [isLoading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [updateSuccess, setUpdateSuccess] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const currentUser = UserStore.useCurrentUser()
  const router = useRouter()
  const redirect = useRedirect(Config.Routes.login())

  useEffect(() => {
    if (!router.query.id) {
      return
    }

    setLoading(true)

    async function getUserData() {
      const response = await UserStore.getUserById(router.query.id as string)

      if (!response || response.error || response.state === 'error' || !response.user) {
        setErrorMessage(
          response.error ?? 'An error occured while getting user. Please try again later.',
        )
      } else {
        setName(response.user.name)
        setIsAdmin(response.user.isAdmin)
        setUser(response.user)
      }

      setLoading(false)
    }

    getUserData()
  }, [router, setLoading, setName, setIsAdmin, setErrorMessage, setUser])

  if (!currentUser || !currentUser.isAdmin) {
    redirect()
    return <Spinner />
  }

  const editUser = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (!user) {
      return
    }

    setNameError('')

    let isValid = true

    const trimmedName = name.trim()

    if (!trimmedName) {
      setNameError('Name is required.')
      isValid = false
    }

    if (!isValid) {
      return
    }

    setLoading(true)

    const response = await UserStore.updateUserById(user._id, name, isAdmin)

    if (!response || response.error || response.state === 'error' || !response.user) {
      setErrorMessage(
        response.error ?? 'An error occured while updating user. Please try again later.',
      )
    } else {
      setUser(response.user)
      setUpdateSuccess('User updated successfully.')
    }

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>My Ecommerce | Admin | Edit User</title>
        <meta name="description" content="Admin edit user" />
        <meta name="keywords" content="admin,edit,user" />
      </Head>
      {(errorMessage || updateSuccess) && (
        <Box mb="1rem">
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {updateSuccess && (
            <Alert status="success">
              <AlertIcon />
              {updateSuccess}
            </Alert>
          )}
        </Box>
      )}
      <VStack
        margin="0 auto"
        maxWidth="500px"
        alignItems="start"
        spacing="1.5rem"
        as="form"
        onSubmit={editUser}
      >
        <GoBack />
        <Heading as="h1" textAlign="start">
          Edit User
        </Heading>
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
        <Checkbox isChecked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}>
          Is Admin?
        </Checkbox>
        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          Update
        </Button>
      </VStack>
    </>
  )
}
