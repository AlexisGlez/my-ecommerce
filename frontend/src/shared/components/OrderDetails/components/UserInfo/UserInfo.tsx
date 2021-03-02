import { ReactNode } from 'react'
import { Heading, Text } from '@chakra-ui/react'

import { divider } from '@app-shared/components/Divider'

interface UserInfoProps {
  title: string
  body: string | ReactNode
}

export const UserInfo: React.FC<UserInfoProps> = ({ title, body }) => {
  return (
    <>
      <Heading as="h2" textAlign="start" fontSize="xl">
        {title}
      </Heading>
      {typeof body === 'string' ? (
        <Text textAlign="start" my="1rem" fontSize="md">
          {body}
        </Text>
      ) : (
        body
      )}
      {divider}
    </>
  )
}
