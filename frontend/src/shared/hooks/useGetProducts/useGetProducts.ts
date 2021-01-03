import useSWR from 'swr'

import { Fetcher } from '@app-shared/Fetcher'
import { Config } from '@app-shared/Config'

export function useGetProducts(initialProducts?: Fetcher.Response<Products>) {
  const { data, error } = useSWR<Fetcher.Response<Products>>(
    Config.Endpoints.getProducts(),
    Fetcher.get,
    {
      initialData: initialProducts,
    },
  )

  if (error) {
    console.error(error)
    return { products: [], isError: true, isLoading: false }
  }

  if (!data) {
    return { products: [], isError: false, isLoading: true }
  }

  return { products: data.data, isError: false, isLoading: false }
}
