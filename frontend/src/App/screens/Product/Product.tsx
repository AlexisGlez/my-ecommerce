import { useCallback } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Image, Grid, VStack, GridItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useGetProduct } from '@app-shared/hooks/useGetProduct'
import { StateMachineContent } from '@app-shared/components/StateMachineContent'
import { GoBack } from '@app-shared/components/Link'
import { stackDivider } from '@app-shared/components/Divider'
import { Fetcher } from '@app-shared/Fetcher'
import { Config } from '@app-shared/Config'
import { CartStore } from '@app-stores/CartStore'

import { ProductInformation } from './components/ProductInformation'
import { AddToCartTable } from './components/AddToCartTable'

type ProductProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const Product: React.FC<ProductProps> = ({ productResponse }) => {
  const router = useRouter()

  const { product, state, error } = useGetProduct(router.query.id as string, productResponse)

  if (!product) {
    return (
      <StateMachineContent state={state} error={error}>
        <GoBack />
      </StateMachineContent>
    )
  }

  const onAddToCart = useCallback(
    (quantity: number) => {
      CartStore.addProductToCart(product, quantity)
      router.push(Config.Routes.cart())
    },
    [router, product],
  )

  return (
    <StateMachineContent state={state} error={error}>
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
              divider={stackDivider}
            />
          </GridItem>
          <GridItem colSpan={{ md: 1, lg: 3 }}>
            <AddToCartTable
              price={product.price}
              countInStock={product.countInStock}
              divider={stackDivider}
              onAddToCart={onAddToCart}
            />
          </GridItem>
        </Grid>
      </VStack>
    </StateMachineContent>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params?.id) {
    return {
      notFound: true,
    }
  }

  const res = await Fetcher.get<Product>(
    Config.Endpoints.getProductById(context.params.id as string),
  )

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
