import { VStack, Text, Flex, Button, Select } from '@chakra-ui/react'

const containerStyles = {
  alignItems: 'center',
  justifyContent: 'space-between',
  p: '0.5rem 1rem',
  width: '100%',
}

interface AddToCartTableProps {
  countInStock: number
  divider: React.ReactElement
  price: number
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
      {countInStock > 0 && (
        <Flex {...containerStyles}>
          <Text>Quantity:</Text>
          <Select width="auto">
            {[...Array(countInStock).keys()].map((value) => (
              <option key={value} value={value + 1}>
                {value + 1}
              </option>
            ))}
          </Select>
        </Flex>
      )}
      <Flex {...containerStyles}>
        <Button width="100%" textTransform="uppercase" disabled={countInStock <= 0}>
          Add To Cart
        </Button>
      </Flex>
    </VStack>
  )
}
