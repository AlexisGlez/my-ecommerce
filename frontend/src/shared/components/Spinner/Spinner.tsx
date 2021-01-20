import { Spinner as ChakraSpinner } from '@chakra-ui/react'

interface SpinnerProps {}

export const Spinner: React.FC<SpinnerProps> = () => {
  return (
    <ChakraSpinner thickness="4px" speed="0.75s" emptyColor="gray.200" color="blue.500" size="xl" />
  )
}
