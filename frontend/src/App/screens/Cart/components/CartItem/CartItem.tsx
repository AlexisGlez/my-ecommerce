import { Image, Flex, Text, Select, IconButton } from '@chakra-ui/react'
import { FaTrash } from 'react-icons/fa'

import { CartStore } from '@app-stores/CartStore'
import { Link } from '@app-shared/components/Link'
import { Config } from '@app-shared/Config'

interface CartItemProps {
  product: Product
  quantity: number
}

export const CartItem: React.FC<CartItemProps> = ({ product, quantity }) => {
  return (
    <Flex
      flexDirection={{ base: 'column', lg: 'row' }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Image width={{ base: '100%', lg: '20%' }} src={product.image} alt={product.description} />
      <Link
        href={Config.Routes.product(product._id)}
        fontWeight="semibold"
        fontSize="lg"
        mt={{ base: '0.5rem', lg: 0 }}
        width={{ base: 'auto', lg: '40%' }}
        textAlign={{ base: 'center', lg: 'start' }}
      >
        {product.name}
      </Link>
      <Text width={{ base: 'auto', lg: '15%' }} mt={{ base: '0.5rem', lg: 0 }}>
        ${product.price}
      </Text>
      <Select
        width={{ base: 'auto', lg: '10%' }}
        mt={{ base: '0.5rem', lg: 0 }}
        value={quantity}
        onChange={(event) => CartStore.addProductToCart(product, Number(event.target.value))}
      >
        {[...Array(product.countInStock).keys()].map((value) => (
          <option key={value} value={value + 1}>
            {value + 1}
          </option>
        ))}
      </Select>
      <IconButton
        size="md"
        fontSize="lg"
        mt={{ base: '0.5rem', lg: 0 }}
        aria-label="Remove item from cart"
        variant="ghost"
        onClick={() => {
          CartStore.removeItemFromCart(product)
        }}
        icon={<FaTrash />}
      />
    </Flex>
  )
}
