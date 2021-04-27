import React from 'react'
import { Box } from '@chakra-ui/react'
import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.css'

interface PaginationProps {
  pageCount: number
  onPageChange: (selectedItem: { selected: number }) => void
}

export const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  return (
    <Box mt="1rem">
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={onPageChange}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
      />
    </Box>
  )
}
