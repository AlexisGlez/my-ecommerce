import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface GoBackProps {}

export const GoBack: React.FC<GoBackProps> = () => {
  const router = useRouter()

  return (
    <Button
      onClick={router.back}
      borderWidth="1px"
      padding="1.5rem"
      display="flex"
      alignItems="center"
      transition="color 0.2s"
      background="none"
      _hover={{ color: 'gray.500' }}
    >
      Go Back
    </Button>
  )
}
