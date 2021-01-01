import { VStack, Text, Flex, Button } from '@chakra-ui/react'

const containerStyles = {
  width: '100%',
  p: '0.5rem 1rem',
  justifyContent: 'space-between',
}

interface AddToCartTableProps {
  price: number
  countInStock: number
  divider: React.ReactElement
}

export const AddToCartTable: React.FC<AddToCartTableProps> = ({ price, countInStock, divider }) => {
  return (
    <VStack divider={divider} borderWidth="1px" borderColor="gray.200">
      <Flex {...containerStyles}>
        <Text>Price:</Text>
        <Text fontWeight="bold">${price}</Text>
      </Flex>
      <Flex {...containerStyles}>
        <Text>Status:</Text>
        <Text>{countInStock > 0 ? 'In' : 'Out of'} Stock</Text>
      </Flex>
      <Flex {...containerStyles}>
        <Text>Quantity:</Text>
        <Text>1</Text>
      </Flex>
      <Flex {...containerStyles}>
        <Button width="100%" textTransform="uppercase" disabled={countInStock <= 0}>
          Add To Cart
        </Button>
      </Flex>
    </VStack>
  )
}
