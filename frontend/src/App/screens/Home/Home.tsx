import { useEffect, useState } from 'react'
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { SimpleGrid, Heading } from '@chakra-ui/react'
import { useGetProducts } from '@app-shared/hooks/useGetProducts'
import { Fetcher } from '@app-shared/Fetcher'
import { Config } from '@app-shared/Config'
import { StateMachineContent } from '@app-shared/components/StateMachineContent'
import { Pagination } from '@app-shared/components/Pagination'

import { ProductCard } from './components/ProductCard'
import { ProductCarousel } from './components/ProductCarousel'

const PAGE_SIZE = 5

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export const Home: React.FC<HomeProps> = ({ productsResponse }) => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)

  const { products, pages, state, error, revalidate } = useGetProducts(
    Config.Endpoints.getProducts({
      keyword: router.query.keyword as string,
      currentPage,
      pageSize: PAGE_SIZE,
    }),
    productsResponse,
  )

  useEffect(() => {
    revalidate()
  }, [currentPage])

  const onPageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1)
  }

  return (
    <>
      {!router.query.keyword && <ProductCarousel />}
      <StateMachineContent state={state} error={error}>
        <Heading my="1rem" textAlign="start">
          Latest Products
        </Heading>
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
        {pages > 1 && <Pagination pageCount={pages} onPageChange={onPageChange} />}
      </StateMachineContent>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await Fetcher.get<Products>(
    Config.Endpoints.getProducts({ currentPage: 1, pageSize: PAGE_SIZE }),
  )

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
