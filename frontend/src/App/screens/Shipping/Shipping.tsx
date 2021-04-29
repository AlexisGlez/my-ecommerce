import Head from 'next/head'
import { useState, FormEvent } from 'react'
import { Heading, VStack, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Input } from '@app-shared/components/Input'
import { CheckoutSteps } from '@app-shared/components/CheckoutSteps'
import { Config } from '@app-shared/Config'
import { CartStore } from '@app-shared/stores/CartStore'

interface ShippingProps {}

export const Shipping: React.FC<ShippingProps> = () => {
  const shipping = CartStore.useShippingAddress()

  const [address, setAddress] = useState(shipping.address)
  const [city, setCity] = useState(shipping.city)
  const [postalCode, setPostalCode] = useState(shipping.postalCode)
  const [country, setCountry] = useState(shipping.country)

  const [addressError, setAddressError] = useState('')
  const [cityError, setCityError] = useState('')
  const [postalCodeError, setPostalCodeError] = useState('')
  const [countryError, setCountryError] = useState('')

  const router = useRouter()

  const onFormCompleted = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault()

    setAddressError('')
    setCityError('')
    setPostalCodeError('')
    setCountryError('')

    let isValid = true

    const trimmedAddress = address.trim()
    const trimmedCity = city.trim()
    const trimmedPostalCode = postalCode.trim()
    const trimmedCountry = country.trim()

    if (!trimmedAddress) {
      setAddressError('Address is required.')
      isValid = false
    }

    if (!trimmedCity) {
      setCityError('City is required.')
      isValid = false
    }

    if (!trimmedPostalCode) {
      setPostalCodeError('Postal Code is required.')
      isValid = false
    }

    if (!trimmedCountry) {
      setCountryError('Country is required.')
      isValid = false
    }

    if (!isValid) {
      return
    }

    CartStore.saveShippingAddress(trimmedAddress, trimmedCity, trimmedPostalCode, trimmedCountry)

    router.push(Config.Routes.payment())
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
      <Head>
        <title>My Ecommerce | Shipping</title>
        <meta name="description" content="Shipping Address" />
        <meta name="keywords" content="shipping,address" />
      </Head>
      <CheckoutSteps page="shipping" />
      <Heading as="h1" textAlign="start">
        Shipping Address
      </Heading>
      <Input
        id="address"
        isInvalid={Boolean(addressError)}
        label="Address"
        type="text"
        placeholder="Enter your address"
        value={address}
        required
        onChange={(event) => setAddress(event.target.value)}
        error={addressError}
      />
      <Input
        id="city"
        isInvalid={Boolean(cityError)}
        label="City"
        type="text"
        placeholder="Enter your city"
        value={city}
        required
        onChange={(event) => setCity(event.target.value)}
        error={cityError}
      />
      <Input
        id="postalCode"
        isInvalid={Boolean(postalCodeError)}
        label="Postal Code"
        type="text"
        placeholder="Enter your postal code"
        value={postalCode}
        required
        onChange={(event) => setPostalCode(event.target.value)}
        error={postalCodeError}
      />
      <Input
        id="country"
        isInvalid={Boolean(countryError)}
        label="Country"
        type="text"
        placeholder="Enter your country"
        value={country}
        required
        onChange={(event) => setCountry(event.target.value)}
        error={countryError}
      />
      <Button type="submit">Continue</Button>
    </VStack>
  )
}
