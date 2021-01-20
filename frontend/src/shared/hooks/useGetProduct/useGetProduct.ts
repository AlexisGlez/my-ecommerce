import useSWR from 'swr'

import { Fetcher } from '@app-shared/Fetcher'
import { Config } from '@app-shared/Config'

type Response = { product: Product | null } & StateMachine

export function useGetProduct(
  productId: string,
  initialProduct?: Fetcher.Response<Product>,
): Response {
  const { data, error } = useSWR<Fetcher.Response<Product>>(
    Config.Endpoints.getProductById(productId),
    Fetcher.get,
    {
      initialData: initialProduct,
    },
  )

  if (error) {
    console.error(error)
    return { product: null, state: 'error', error }
  }

  if (!data) {
    return { product: null, state: 'loading', error: null }
  }

  if (data.status >= 400) {
    return { product: data.data, state: 'error', error: data.message }
  }

  return { product: data.data, state: 'success', error: null }
}
