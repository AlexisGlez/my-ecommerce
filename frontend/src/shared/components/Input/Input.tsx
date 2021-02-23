import { ChangeEvent } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input as ChakraInput,
} from '@chakra-ui/react'

interface InputProps {
  id: string
  isInvalid: boolean
  disabled?: boolean
  label: string
  type: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  value: string
  helperText?: string
  error?: string
  required?: boolean
}

export const Input: React.FC<InputProps> = ({
  id,
  isInvalid,
  label,
  type,
  placeholder,
  value,
  onChange,
  helperText,
  error,
  disabled,
  required,
}) => {
  return (
    <FormControl id={id} isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <ChakraInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
      {helperText && <FormHelperText textAlign="start">{helperText}</FormHelperText>}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}
