import { HStack, Icon, Text } from '@chakra-ui/react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const MAX_STARS_ALLOWED = 5

interface RatingProps {
  rating: number
  label?: string
}

export const Rating: React.FC<RatingProps> = ({ rating, label = '' }) => {
  let starsIcons = []

  if (rating >= 5) {
    starsIcons = [FaStar, FaStar, FaStar, FaStar, FaStar]
  } else {
    const fullStarsAmount = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let index = 0; index < fullStarsAmount; index += 1) {
      starsIcons.push(FaStar)
    }

    if (hasHalfStar) {
      starsIcons.push(FaStarHalfAlt)
    }

    for (let index = starsIcons.length; index < MAX_STARS_ALLOWED; index += 1) {
      starsIcons.push(FaRegStar)
    }
  }

  return (
    <HStack>
      {starsIcons.map((StarIcon, index) => (
        <Icon key={index} as={StarIcon} mr="2px" />
      ))}
      <Text>{label}</Text>
    </HStack>
  )
}
