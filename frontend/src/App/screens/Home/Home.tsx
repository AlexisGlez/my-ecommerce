import { InferGetStaticPropsType, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { SimpleGrid } from '@chakra-ui/react'
import { useGetProducts } from '@app-shared/hooks/useGetProducts'
import { Fetcher } from '@app-shared/Fetcher'
import { Config } from '@app-shared/Config'
import { StateMachineContent } from '@app-shared/components/StateMachineContent'

import { ProductCard } from './components/ProductCard'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export const Home: React.FC<HomeProps> = ({ productsResponse }) => {
  const router = useRouter()

  const { products, state, error } = useGetProducts(
    productsResponse,
    router.query.keyword as string,
  )

  return (
    <StateMachineContent state={state} error={error}>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing="1rem">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            name={product.name}
            image={product.image}
            description={product.description}
            rating={product.rating}
            numReviews={product.numReviews}
            price={product.price}
          />
        ))}
      </SimpleGrid>
    </StateMachineContent>
  )
}

export const getStaticProps: GetStaticProps = async () => {
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
