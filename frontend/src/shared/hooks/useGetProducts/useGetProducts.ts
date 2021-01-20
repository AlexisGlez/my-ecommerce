import useSWR from 'swr'

import { Fetcher } from '@app-shared/Fetcher'
import { Config } from '@app-shared/Config'

type Response = { products: Products } & StateMachine

export function useGetProducts(initialProducts?: Fetcher.Response<Products>): Response {
  const { data, error } = useSWR<Fetcher.Response<Products>>(
    Config.Endpoints.getProducts(),
    Fetcher.get,
    {
      initialData: initialProducts,
    },
  )

  if (error) {
    console.error(error)
    return { products: [], state: 'error', error }
  }

  if (!data) {
    return { products: [], state: 'loading', error: null }
  }

  if (data.status >= 400) {
    return { products: data.data, state: 'error', error: data.message }
  }

  return { products: data.data, state: 'success', error: null }
}
