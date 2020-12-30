import { SimpleGrid } from '@chakra-ui/react'

import { ProductCard } from './components/ProductCard'

import products from '@app-src/products'

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing="1rem">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          _id={product._id}
          name={product.name}
          image={product.image}
          description={product.description}
          rating={product.rating}
          numReviews={product.numReviews}
          price={product.price}
        />
      ))}
    </SimpleGrid>
  )
}
