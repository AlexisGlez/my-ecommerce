import useSWR from 'swr'

import { Fetcher } from '@app-shared/Fetcher'
import { Config } from '@app-shared/Config'

export function useGetProduct(productId: string, initialProduct?: Fetcher.Response<Product>) {
  const { data, error } = useSWR<Fetcher.Response<Product>>(
    Config.Endpoints.getProductById(productId),
    Fetcher.get,
    {
      initialData: initialProduct,
    },
  )

  if (error) {
    console.error(error)
    return { products: null, isError: true, isLoading: false }
  }

  if (!data) {
    return { products: null, isError: false, isLoading: true }
  }

  return { product: data.data, isError: false, isLoading: false }
}
