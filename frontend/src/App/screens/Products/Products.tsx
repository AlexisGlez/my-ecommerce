import { useState } from 'react'
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
  Button,
} from '@chakra-ui/react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'

import { Config } from '@app-src/shared/Config'
import { ErrorMessage } from '@app-shared/components/ErrorMessage'
import { Spinner } from '@app-shared/components/Spinner'
import { useRedirect } from '@app-shared/hooks/useRedirect'
import { useGetProducts } from '@app-shared/hooks/useGetProducts'
import { Link } from '@app-shared/components/Link'
import { formatNumber } from '@app-shared/utils/formatNumber'
import { UserStore } from '@app-stores/UserStore'
import { ProductsStore } from '@app-stores/ProductsStore'

interface ProductsProps {}

export const Products: React.FC<ProductsProps> = () => {
  const [isDeletingProduct, setIsDeletingProduct] = useState(false)
  const [deleteProductError, setDeleteProductError] = useState('')
  const currentUser = UserStore.useCurrentUser()
  const redirect = useRedirect(Config.Routes.login())
  const { products, state, error, revalidate } = useGetProducts()

  if (!currentUser || !currentUser.isAdmin) {
    redirect()
    return <Spinner />
  }

  const deleteProduct = async (productId: string) => {
    if (!window.confirm('Are you sure?')) {
      return
    }

    setIsDeletingProduct(true)

    const response = await ProductsStore.deleteProduct(currentUser, productId)

    if (!response || response.error || response.state === 'error' || !response.wasProductDeleted) {
      setDeleteProductError(
        response.error ?? 'An error occured while deleting product. Please try again later.',
      )
    } else {
      await revalidate()
    }

    setIsDeletingProduct(false)
  }

  const onCreateProduct = () => {}

  const errorMessage = error || deleteProductError

  return (
    <>
      {errorMessage && (
        <Box mb="1rem">{errorMessage && <ErrorMessage message={errorMessage} />}</Box>
      )}
      <Heading as="h1" mb="1rem">
        Products
      </Heading>
      <Flex justifyContent="flex-end" mb="1rem">
        <Button textTransform="uppercase" onClick={onCreateProduct}>
          <Icon as={FaPlus} mr="0.5rem" /> Create Product
        </Button>
      </Flex>
      {state === 'loading' ? (
        <Spinner />
      ) : (
        <Table variant="simple">
          <TableCaption>Products</TableCaption>
          <Thead>
            <Tr>
              <Th textAlign="center">Id</Th>
              <Th textAlign="center">Name</Th>
              <Th textAlign="center">Price</Th>
              <Th textAlign="center">Category</Th>
              <Th textAlign="center">Brand</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product._id}>
                <Td textAlign="center" paddingX="1rem">
                  {product._id}
                </Td>
                <Td textAlign="center" paddingX="1rem">
                  {product.name}
                </Td>
                <Td textAlign="center" paddingX="1rem">
                  {formatNumber(product.price)}
                </Td>
                <Td textAlign="center" paddingX="1rem">
                  {product.category}
                </Td>
                <Td textAlign="center" paddingX="1rem">
                  {product.brand}
                </Td>
                <Td textAlign="center" paddingX="1rem">
                  <Flex alignItems="center" justifyContent="center">
                    <Link
                      href={Config.Routes.editProduct(product._id)}
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
                      isLoading={isDeletingProduct}
                      onClick={() => {
                        deleteProduct(product._id)
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
              <Th textAlign="center">Price</Th>
              <Th textAlign="center">Category</Th>
              <Th textAlign="center">Brand</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Tfoot>
        </Table>
      )}
    </>
  )
}
