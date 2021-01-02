/// <reference path="./Fetcher.d.ts" />

import axios, { AxiosResponse } from 'axios'

export class Fetcher {
  private static formatResponse<T>(response: AxiosResponse<T>): Fetcher.Response<T> {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    }
  }

  public static async get<T>(url: Fetcher.Url, config?: Fetcher.GetRequest) {
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
  ) {
    try {
      const response: AxiosResponse<T> = await axios({ method: httpVerb, url, ...config })

      return Fetcher.formatResponse<T>(response)
    } catch (error) {
      console.error(`An error has ocurred sending ${httpVerb} to: ${url}.\nError: ${error}`)
    }

    return null
  }
}
