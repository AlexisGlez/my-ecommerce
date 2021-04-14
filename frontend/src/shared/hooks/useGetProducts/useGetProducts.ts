import useSWR from 'swr'

import { Fetcher } from '@app-shared/Fetcher'
import { Config } from '@app-shared/Config'

type Response = { products: Products; revalidate: () => Promise<boolean> } & StateMachine

export function useGetProducts(
  initialProducts?: Fetcher.Response<Products>,
  keyword?: string,
): Response {
  const { data, error, revalidate } = useSWR<Fetcher.Response<Products>>(
    Config.Endpoints.getProducts(keyword),
    Fetcher.get,
    {
      initialData: initialProducts,
    },
  )

  if (error) {
    console.error(error)
    return { products: [], state: 'error', error, revalidate }
  }

  if (!data) {
    return { products: [], state: 'loading', error: null, revalidate }
  }

  if (data.status >= 400) {
    return { products: data.data, state: 'error', error: data.message, revalidate }
  }

  return { products: data.data, state: 'success', error: null, revalidate }
}
