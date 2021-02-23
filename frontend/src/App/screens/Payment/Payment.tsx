import { useState, FormEvent } from 'react'
import {
  Heading,
  VStack,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  HStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { CheckoutSteps } from '@app-shared/components/CheckoutSteps'
import { Config } from '@app-shared/Config'
import { CartStore } from '@app-shared/stores/CartStore'

interface PaymentProps {}

export const Payment: React.FC<PaymentProps> = () => {
  const shipping = CartStore.useShippingAddress()
  const router = useRouter()

  if (!shipping.address) {
    router.replace(Config.Routes.shipping())
    return null
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const onFormCompleted = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault()

    CartStore.savePaymentMathod(paymentMethod)

    router.push(Config.Routes.checkout())
  }

  return (
    <VStack
      margin="0 auto"
      maxWidth="500px"
      alignItems="start"
      spacing="1.5rem"
      as="form"
      onSubmit={onFormCompleted}
    >
      <CheckoutSteps page="payment" />
      <Heading as="h1" textAlign="start">
        Payment Method
      </Heading>
      <FormControl as="fieldset">
        <FormLabel as="legend">Select Payment Method</FormLabel>
        <RadioGroup defaultValue="PayPal" onChange={(value) => setPaymentMethod(value as string)}>
          <HStack spacing="1rem">
            <Radio value="PayPal">PayPal</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>
      <Button type="submit">Continue</Button>
    </VStack>
  )
}
