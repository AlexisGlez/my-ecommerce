/// <reference path="./Fetcher.d.ts" />

import axios, { AxiosResponse } from 'axios'

export class Fetcher {
  private static formatResponse<T>(
    response: AxiosResponse<Fetcher.ResponseFromServer<T>>,
  ): Fetcher.Response<T> {
    return {
      data: response.data.data,
      message: response.data.message ?? null,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    }
  }

  public static async get<T>(url: Fetcher.Url, config?: Fetcher.GetRequest) {
    if (url.includes('undefined')) {
      return null
    }

    return Fetcher.httpPetition<T>('get', url, config)
  }

  public static async post<T>(url: Fetcher.Url, config?: Fetcher.PostRequest) {
    return Fetcher.httpPetition<T>('post', url, config)
  }

  public static async patch<T>(url: Fetcher.Url, config?: Fetcher.PostRequest) {
    return Fetcher.httpPetition<T>('patch', url, config)
  }

  public static async delete<T>(url: Fetcher.Url, config?: Fetcher.PostRequest) {
    return Fetcher.httpPetition<T>('delete', url, config)
  }

  private static async httpPetition<T>(
    httpVerb: HttpVerbs,
    url: Fetcher.Url,
    config: Fetcher.GetRequest | Fetcher.PostRequest = {},
  ): Promise<Fetcher.Response<T> | null> {
    try {
      const response: AxiosResponse<Fetcher.ResponseFromServer<T>> = await axios({
        method: httpVerb,
        url,
        ...config,
      })

      return Fetcher.formatResponse<T>(response)
    } catch (error) {
      console.error(`An error has ocurred sending ${httpVerb} to: ${url}.\n${error}`)

      if (error.response != null) {
        return Fetcher.formatResponse<T>(
          error.response as AxiosResponse<Fetcher.ResponseFromServer<T>>,
        )
      }
    }

    return null
  }
}
