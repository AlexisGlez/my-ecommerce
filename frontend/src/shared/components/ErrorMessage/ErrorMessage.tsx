import { Alert, AlertIcon } from '@chakra-ui/react'

interface ErrorMessageProps {
  message: string | null
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      {message ?? 'An error occurred!'}
    </Alert>
  )
}
