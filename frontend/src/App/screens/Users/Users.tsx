import { useState, useEffect } from 'react'
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Icon,
  IconButton,
  Flex,
} from '@chakra-ui/react'
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa'

import { Config } from '@app-src/shared/Config'
import { ErrorMessage } from '@app-shared/components/ErrorMessage'
import { Spinner } from '@app-shared/components/Spinner'
import { useRedirect } from '@app-shared/hooks/useRedirect'
import { UserStore } from '@app-stores/UserStore'
import { Link } from '@app-shared/components/Link'

interface UsersProps {}

export const Users: React.FC<UsersProps> = () => {
  const [isLoading, setLoading] = useState(false)
  const [usersError, setUsersError] = useState('')
  const [users, setUsers] = useState<Array<User>>([])
  const [isDeletingUser, setIsDeletingUser] = useState(false)
  const [deleteUserError, setDeleteUserError] = useState('')
  const currentUser = UserStore.useCurrentUser()
  const redirect = useRedirect(Config.Routes.login())

  async function getAllUsers() {
    setLoading(true)

    const response = await UserStore.getAllUsers()

    if (!response || response.error || response.state === 'error' || !response.users) {
      setUsersError(
        response.error ?? 'An error occured while getting all users. Please try again later.',
      )
    } else {
      setUsers(response.users)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      return
    }

    getAllUsers()
  }, [currentUser])

  if (!currentUser || !currentUser.isAdmin) {
    redirect()
    return <Spinner />
  }

  const deleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure?')) {
      return
    }

    setIsDeletingUser(true)

    const response = await UserStore.deleteUser(userId)

    if (!response || response.error || response.state === 'error' || !response.wasUserDeleted) {
      setDeleteUserError(
        response.error ?? 'An error occured while getting all users. Please try again later.',
      )
    } else {
      await getAllUsers()
    }

    setIsDeletingUser(false)
  }

  const errorMessage = usersError || deleteUserError

  return (
    <>
      {errorMessage && (
        <Box mb="1rem">{errorMessage && <ErrorMessage message={errorMessage} />}</Box>
      )}
      <Heading as="h1" mb="1rem">
        Users
      </Heading>
      {isLoading ? (
        <Spinner />
      ) : (
        <Table variant="simple">
          <TableCaption>User Orders</TableCaption>
          <Thead>
            <Tr>
              <Th textAlign="center">Id</Th>
              <Th textAlign="center">Name</Th>
              <Th textAlign="center">Email</Th>
              <Th textAlign="center">Admin</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td textAlign="center" paddingX="1rem">
                  {user._id}
                </Td>
                <Td textAlign="center" paddingX="1rem">
                  {user.name}
                </Td>
                <Td textAlign="center" paddingX="1rem">
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </Td>
                <Td textAlign="center" paddingX="1rem">
                  {user.isAdmin ? (
                    <Icon as={FaCheck} fill="green.500" />
                  ) : (
                    <Icon as={FaTimes} fill="red.500" />
                  )}
                </Td>
                <Td textAlign="center" paddingX="1rem">
                  <Flex alignItems="center" justifyContent="center">
                    <Link
                      href={Config.Routes.editUser(user._id)}
                      role="button"
                      justifyContent="center"
                      fontSize="1.5rem"
                    >
                      <Icon as={FaEdit} fill="teal.500" />
                    </Link>
                    <IconButton
                      aria-label="Delete user"
                      colorScheme="red"
                      size="xs"
                      marginLeft="1rem"
                      variant="outline"
                      isLoading={isDeletingUser}
                      onClick={() => {
                        deleteUser(user._id)
                      }}
                      icon={<FaTrash />}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th textAlign="center">Id</Th>
              <Th textAlign="center">Name</Th>
              <Th textAlign="center">Email</Th>
              <Th textAlign="center">Admin</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Tfoot>
        </Table>
      )}
    </>
  )
}
