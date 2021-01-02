import { GetServerSideProps } from 'next'
import { Image, Grid, VStack, StackDivider, GridItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { GoBack } from '@app-shared/components/Link'
import { useGetProduct } from '@app-shared/hooks/useGetProduct'
import { Fetcher } from '@app-shared/Fetcher'

import { ProductInformation } from './components/ProductInformation'
import { AddToCartTable } from './components/AddToCartTable'

const divider = <StackDivider borderColor="gray.200" />

interface ProductProps {}

export const Product: React.FC<ProductProps> = () => {
  const router = useRouter()

  const { product } = useGetProduct(router.query.id as string)

  if (!product) {
    return <GoBack />
  }

  return (
    <VStack alignItems="flex-start">
      <GoBack />
      <Grid mt="1rem" templateColumns={{ md: 'repeat(1, 1fr)', lg: 'repeat(12, 1fr)' }} gap={6}>
        <GridItem colSpan={{ md: 1, lg: 6 }}>
          <Image width="100%" src={product.image} alt={product.description} />
        </GridItem>
        <GridItem colSpan={{ md: 1, lg: 3 }}>
          <ProductInformation
            name={product.name}
            description={product.description}
            price={product.price}
            divider={divider}
          />
        </GridItem>
        <GridItem colSpan={{ md: 1, lg: 3 }}>
          <AddToCartTable
            price={product.price}
            countInStock={product.countInStock}
            divider={divider}
          />
        </GridItem>
      </Grid>
    </VStack>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params?.id) {
    return {
      notFound: true,
    }
  }

  const res = await Fetcher.get<Product>(`http://127.0.0.1:8000/api/products/${context.params.id}`)

  if (!res || !res.data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      productResponse: res,
    },
  }
}
