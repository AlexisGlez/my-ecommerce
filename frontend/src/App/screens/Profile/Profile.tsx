import { useState } from 'react'
import { Grid, GridItem, Alert, AlertIcon, Box } from '@chakra-ui/react'

import { Config } from '@app-src/shared/Config'
import { ErrorMessage } from '@app-shared/components/ErrorMessage'
import { Spinner } from '@app-shared/components/Spinner'
import { useRedirect } from '@app-shared/hooks/useRedirect'
import { UserForm } from '@app-shared/components/UserForm'
import { UserStore } from '@app-stores/UserStore'

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
  const [isLoading, setLoading] = useState(false)
  const [updateError, setUpdateError] = useState('')
  const [updateSuccess, setUpdateSuccess] = useState('')
  const currentUser = UserStore.useCurrentUser()
  const redirect = useRedirect(Config.Routes.login())

  if (!currentUser) {
    redirect()
    return <Spinner />
  }

  const updateProfile = async (name: string, password: string) => {
    setLoading(true)
    const response = await UserStore.updateUserProfile(name, password)
    setLoading(false)

    if (!response || response.error || response.state === 'error') {
      const errorMessage =
        (response.error as any)?.message ||
        'An error occurred while updating your profile. Please try again later.'
      setUpdateError(errorMessage)
    } else {
      setUpdateSuccess('Profile settings saved successfully.')
    }

    setTimeout(() => {
      setUpdateError('')
      setUpdateSuccess('')
    }, 3000)
  }

  return (
    <>
      {(updateError || updateSuccess) && (
        <Box mb="1rem">
          {updateError && <ErrorMessage message={updateError} />}
          {updateSuccess && (
            <Alert status="success">
              <AlertIcon />
              {updateSuccess}
            </Alert>
          )}
        </Box>
      )}
      <Grid templateColumns="repeat(12, 1fr)" gap={1}>
        <GridItem colSpan={3}>
          {currentUser && (
            <UserForm
              type="profile"
              onProfileUpdate={updateProfile}
              isLoading={isLoading}
              defaultName={currentUser.name}
              defaultEmail={currentUser.email}
            />
          )}
        </GridItem>
        <GridItem colSpan={9}>
          <div>Hello World</div>
        </GridItem>
      </Grid>
    </>
  )
}
