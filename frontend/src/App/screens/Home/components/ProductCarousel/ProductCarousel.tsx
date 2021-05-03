import { Box, Image, Text } from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'

import { Link } from '@app-shared/components/Link'
import { useTopRatedProducts } from '@app-shared/hooks/useTopRatedProducts'
import { StateMachineContent } from '@app-shared/components/StateMachineContent'
import { Config } from '@app-shared/Config'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface ProductCarouselProps {}

export const ProductCarousel: React.FC<ProductCarouselProps> = () => {
  const { products, error, state } = useTopRatedProducts()

  return (
    <StateMachineContent state={state} error={error}>
      <Box mt="7rem" backgroundColor="#1A202C" padding="1rem" position="relative" zIndex="0">
        <Carousel showArrows autoPlay infiniteLoop showThumbs={false}>
          {products.map((product) => (
            <Link key={product._id} href={Config.Routes.product(product._id)} display="block">
              <Box>
                <Text mb="1rem" color="white">
                  {product.name} ${product.price}
                </Text>
                <Image
                  src={product.image}
                  alt={product.description}
                  width={{ base: '280px !important', md: '300px !important' }}
                  height={{ base: '280px !important', md: '300px !important' }}
                  borderRadius="50%"
                  objectFit="cover"
                />
              </Box>
            </Link>
          ))}
        </Carousel>
      </Box>
    </StateMachineContent>
  )
}
