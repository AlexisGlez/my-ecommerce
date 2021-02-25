import { Flex, Text, Button, Box, VStack, Heading } from '@chakra-ui/react'

import { divider, dividerColor } from '@app-shared/components/Divider'

interface SubtotalBoxProps {
  subtotal: number
  totalItems: number
  onCheckoutClick: () => void
}

export const SubtotalBox: React.FC<SubtotalBoxProps> = ({
  subtotal,
  totalItems,
  onCheckoutClick,
}) => {
  return (
    <VStack borderWidth="1px" borderColor={dividerColor} divider={divider}>
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
