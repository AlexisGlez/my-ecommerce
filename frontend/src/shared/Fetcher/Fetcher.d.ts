type HttpVerbs = 'get' | 'post' | 'patch' | 'delete'

declare namespace Fetcher {
  type Url = string

  type ResponseFromServer<T> = {
    data: T
    message: string | null
  }

  type Response<T> = {
    data: T
    message: string | null
    status: number
    statusText: string
    headers?: any
  } | null

  type CommonTypes = {
    headers?: Record<string, any>
    timeout?: number
  }

  type QueryData = {
    params?: Record<string, any>
  }

  type PostData = {
    data?: Record<string, any>
  }

  type GetRequest = CommonTypes & QueryData
  type PostRequest = CommonTypes & PostData
}
