import { useState, useEffect, FormEvent } from 'react'
import {
  VStack,
  Heading,
  Text,
  Box,
  Alert,
  AlertIcon,
  Select,
  Textarea,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'

import { Rating } from '@app-shared/components/Rating'
import { Link } from '@app-shared/components/Link'
import { ErrorMessage } from '@app-shared/components/ErrorMessage'
import { formatDate } from '@app-shared/utils/formatDate'
import { Config } from '@app-shared/Config'
import { ProductsStore } from '@app-stores/ProductsStore'
import { UserStore } from '@app-shared/stores/UserStore'
import { refetchProduct } from '@app-shared/hooks/useGetProduct'

interface ReviewsProps {
  productId: string
  reviews: Reviews | undefined
  divider: React.ReactElement
}

export const Reviews: React.FC<ReviewsProps> = ({ productId, reviews, divider }) => {
  const currentUser = UserStore.useCurrentUser()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [setIsMounted])

  const createReview = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault()

    setErrorMessage('')

    if (!currentUser) {
      return
    }

    if (!rating) {
      setErrorMessage('Please select a valid rating.')
      return
    }

    setIsLoading(true)

    const response = await ProductsStore.createProductReview(currentUser, productId, {
      rating,
      comment: comment || 'No comment given.',
    })

    if (!response || response.error || response.state === 'error' || !response.product) {
      setErrorMessage(
        response.error ?? 'An error occured while reviewing product. Please try again later.',
      )
    } else {
      refetchProduct(productId)
    }

    setIsLoading(false)
  }
  return (
    <VStack alignItems="flex-start" justifyContent="flex-start" width="100%">
      <Heading as="h3" fontSize="2xl">
        Reviews
      </Heading>
      {!reviews ||
        (reviews.length === 0 && (
          <Alert status="info">
            <AlertIcon />
            No Reviews
          </Alert>
        ))}
      {reviews && (
        <VStack divider={divider} alignItems="flex-start" justifyContent="flex-start" width="100%">
          {reviews.map((review) => (
            <Box key={review._id} textAlign="start" mb="1rem">
              <Text fontWeight="bold" fontSize="md">
                {review.name}
              </Text>
              <Rating rating={review.rating} />
              <Text fontSize="md" my="0.5rem">
                {formatDate(review.createdAt)}
              </Text>
              <Text fontSize="md">{review.comment}</Text>
            </Box>
          ))}
        </VStack>
      )}
      <Heading as="h4" fontSize="xl" mt="1rem">
        Write a Review
      </Heading>
      {isMounted && !currentUser && (
        <Alert status="info">
          <AlertIcon />
          Please{' '}
          <Link href={Config.Routes.login()} justifyContent="center" textDecoration="underline">
            sign in
          </Link>{' '}
          to write a review.
        </Alert>
      )}
      {isMounted && currentUser && (
        <VStack
          margin="0 auto"
          alignItems="start"
          spacing="1.5rem"
          width="100%"
          as="form"
          onSubmit={createReview}
        >
          {errorMessage && (
            <Box width="100%">
              <ErrorMessage message={errorMessage} />
            </Box>
          )}
          <FormControl id="rating">
            <FormLabel>Rating</FormLabel>
            <Select value={rating} onChange={(event) => setRating(Number(event.target.value))}>
              <option value="0">Select...</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excelent</option>
            </Select>
          </FormControl>
          <FormControl id="comment">
            <FormLabel>Comment</FormLabel>
            <Textarea
              placeholder="Write a review..."
              value={comment}
              resize="none"
              onChange={(e) => setComment(e.target.value)}
            />
          </FormControl>
          <Button type="submit" isLoading={isLoading} disabled={isLoading}>
            Submit
          </Button>
        </VStack>
      )}
    </VStack>
  )
}
