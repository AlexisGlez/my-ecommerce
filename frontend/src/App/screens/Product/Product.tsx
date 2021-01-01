import { Image, Grid, VStack, StackDivider, GridItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { GoBack } from '@app-shared/components/Link'
import products from '@app-src/products'
import { ProductInformation } from './components/ProductInformation'
import { AddToCartTable } from './components/AddToCartTable'

const divider = <StackDivider borderColor="gray.200" />

interface ProductProps {}

export const Product: React.FC<ProductProps> = () => {
  const router = useRouter()

  const product = products.find((p) => p._id === router.query.id)

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
