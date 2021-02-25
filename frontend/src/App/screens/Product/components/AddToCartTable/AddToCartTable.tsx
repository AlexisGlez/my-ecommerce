import { ChangeEvent, useCallback, useState } from 'react'
import { VStack, Button, Select } from '@chakra-ui/react'

import { TableRow } from '@app-shared/components/TableRow'
import { dividerColor } from '@app-shared/components/Divider'

interface AddToCartTableProps {
  countInStock: number
  divider: React.ReactElement
  price: number
  onAddToCart: (quantity: number) => void
}

export const AddToCartTable: React.FC<AddToCartTableProps> = ({
  price,
  countInStock,
  divider,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(countInStock > 0 ? 1 : 0)

  const onQuantitySelected = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(event.target.value)

      if (Number.isNaN(value)) {
        return
      }

      setQuantity(value)
    },
    [setQuantity],
  )

  const addToCart = useCallback(() => {
    onAddToCart(quantity)
  }, [onAddToCart, quantity])

  return (
    <VStack divider={divider} borderWidth="1px" borderColor={dividerColor}>
      <TableRow title="Price" value={`$${price}`} />
      <TableRow title="Status" value={`${countInStock > 0 ? 'In' : 'Out of'} Stock`} />
      {countInStock > 0 && (
        <TableRow
          title="Quantity"
          value={
            <Select width="auto" onChange={onQuantitySelected}>
              {[...Array(countInStock).keys()].map((value) => (
                <option key={value} value={value + 1}>
                  {value + 1}
                </option>
              ))}
            </Select>
          }
        />
      )}
      <TableRow
        value={
          <Button
            width="100%"
            textTransform="uppercase"
            disabled={countInStock <= 0}
            onClick={addToCart}
          >
            Add To Cart
          </Button>
        }
      />
    </VStack>
  )
}
