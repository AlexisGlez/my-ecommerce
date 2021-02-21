import { Image, Box, Heading, useColorModeValue } from '@chakra-ui/react'
import { Link } from '@app-shared/components/Link'
import { Rating } from '@app-shared/components/Rating'
import { Config } from '@app-shared/Config'

interface ProductCardProps {
  id: string
  name: string
  image: string
  description: string
  price: number
  rating: number
  numReviews: number
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  description,
  rating,
  numReviews,
  price,
}) => {
  const borderColor = useColorModeValue('rgba(0, 0, 0, .125)', 'rgba(255, 255, 255, .125)')

  return (
    <Link
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      border={`1px solid ${borderColor}`}
      borderRadius=".25rem"
      p="1rem"
      href={Config.Routes.product(id)}
    >
      <Image src={image} alt={description} />
      <Heading as="h1" fontSize="xl" fontWeight="bold" mt="2rem">
        {name}
      </Heading>
      <Box fontSize="md" mt="2rem">
        <Rating rating={rating} label={`${numReviews} reviews`} />
      </Box>
      <Heading as="h3" mt="2rem">
        ${price}
      </Heading>
    </Link>
  )
}
