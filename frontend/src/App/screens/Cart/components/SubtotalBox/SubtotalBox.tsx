import { Flex, Text, Button, Box, VStack, Heading } from '@chakra-ui/react'

import { divider } from '@app-shared/components/Divider'

interface SubtotalBoxProps {
  borderColor: string
  subtotal: number
  totalItems: number
  onCheckoutClick: () => void
}

export const SubtotalBox: React.FC<SubtotalBoxProps> = ({
  borderColor,
  subtotal,
  totalItems,
  onCheckoutClick,
}) => {
  return (
    <VStack borderWidth="1px" borderColor={borderColor} divider={divider}>
      <Box padding="1rem">
        <Heading as="h2">Subtotal ({totalItems}) Items</Heading>
        <Text fontSize="md" mt="1rem">
          ${subtotal.toFixed(2)}
        </Text>
      </Box>
      <Flex width="100%" padding="1rem">
        <Button fontSize="md" width="100%" textTransform="uppercase" onClick={onCheckoutClick}>
          Go to Checkout
        </Button>
      </Flex>
    </VStack>
  )
}
