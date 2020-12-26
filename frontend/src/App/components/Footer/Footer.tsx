import { Container } from '@chakra-ui/react'

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer>
      <Container centerContent>Copyright &copy; AlexisGlez</Container>
    </footer>
  )
}
