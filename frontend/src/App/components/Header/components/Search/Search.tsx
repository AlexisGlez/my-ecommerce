import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { HStack, Button } from '@chakra-ui/react'

import { Input } from '@app-shared/components/Input'
import { Config } from '@app-shared/Config'

interface SearchProps {}

export const Search: React.FC<SearchProps> = () => {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const onSearchProduct = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault()

    const keyword = search.trim()
    if (keyword) {
      router.push(Config.Routes.search(keyword))
    }
  }

  return (
    <HStack
      as="form"
      alignItems="center"
      justifyContent="center"
      onSubmit={onSearchProduct}
      ml="1rem"
      maxWidth="270px"
    >
      <Input
        id="search"
        isInvalid={false}
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <Button type="submit">Search</Button>
    </HStack>
  )
}
