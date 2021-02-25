import { Spinner as ChakraSpinner } from '@chakra-ui/react'

import { dividerColor } from '@app-shared/components/Divider'

interface SpinnerProps {}

export const Spinner: React.FC<SpinnerProps> = () => {
  return (
    <ChakraSpinner
      thickness="4px"
      speed="0.75s"
      emptyColor={dividerColor}
      color="blue.500"
      size="xl"
    />
  )
}
