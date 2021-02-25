import { ReactNode } from 'react'
import { Text, Flex } from '@chakra-ui/react'

interface TableRowProps {
  title?: string
  value: string | ReactNode
}

export const TableRow: React.FC<TableRowProps> = ({ title, value }) => {
  return (
    <Flex alignItems="center" justifyContent="space-between" p="0.5rem 1rem" width="100%">
      {title && <Text>{title}:</Text>}
      {typeof value === 'string' ? <Text fontWeight="bold">{value}</Text> : value}
    </Flex>
  )
}
