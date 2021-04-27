import useSWR from 'swr'

import { Fetcher } from '@app-shared/Fetcher'

type Response = {
  products: Products
  page: number
  pages: number
  revalidate: () => Promise<boolean>
} & StateMachine

const emptyState = {
  products: [],
  page: 0,
  pages: 0,
}

export function useGetProducts(
  productsEndpoint: string,
  initialProducts?: Fetcher.Response<ProductsResponse>,
): Response {
  const { data, error, revalidate } = useSWR<Fetcher.Response<ProductsResponse>>(
    productsEndpoint,
    Fetcher.get,
    {
      initialData: initialProducts,
    },
  )

  if (error) {
    console.error(error)
    return { ...emptyState, state: 'error', error, revalidate }
  }

  if (!data) {
    return { ...emptyState, state: 'loading', error: null, revalidate }
  }

  if (data.status >= 400) {
    return { ...emptyState, ...data.data, state: 'error', error: data.message, revalidate }
  }

  return { ...data.data, state: 'success', error: null, revalidate }
}
