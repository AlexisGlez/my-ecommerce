import { InferGetStaticPropsType } from 'next'
import { SimpleGrid } from '@chakra-ui/react'
import { useGetProducts } from '@app-shared/hooks/useGetProducts'
import { Fetcher } from '@app-shared/Fetcher'
import { Config } from '@app-shared/Config'

import { ProductCard } from './components/ProductCard'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export const Home: React.FC<HomeProps> = ({ productsResponse }) => {
  const { products, state, error } = useGetProducts(productsResponse)

  if (state === 'error') {
    return <h1>{error}</h1>
  } else if (state === 'loading') {
    return <h1>Loading...</h1>
  }

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

export const getStaticProps = async () => {
  const res = await Fetcher.get<Products>(Config.Endpoints.getProducts())

  if (!res || !res.data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      productsResponse: res,
    },
  }
}
