import { VStack, Heading, StackDivider, Text, Flex, ResponsiveValue } from '@chakra-ui/react'
import { Rating } from '@app-shared/components/Rating'
import * as CSS from 'csstype'

const stackStyles = {
  px: '1rem',
  width: '100%',
}

const textStyles = {
  ...stackStyles,
  textAlign: { base: 'center', lg: 'left' } as ResponsiveValue<CSS.Property.TextAlign>,
}

interface ProductInformationProps {
  name: string
  price: number
  description: string
  divider: React.ReactElement
}

export const ProductInformation: React.FC<ProductInformationProps> = ({
  name,
  price,
  description,
  divider,
}) => {
  return (
    <VStack divider={divider}>
      <Heading as="h2" fontSize="3xl" {...textStyles}>
        {name}
      </Heading>
      <Flex justifyContent={{ base: 'center', lg: 'left' }} {...stackStyles}>
        <Rating rating={5} label={`${5} reviews`} />
      </Flex>
      <Text fontSize="md" {...textStyles}>
        Price: ${price}
      </Text>
      <Text fontSize="md" {...textStyles}>
        Description: {description}
      </Text>
    </VStack>
  )
}
