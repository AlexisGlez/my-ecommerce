export function checkNullResponse(response: Fetcher.Response<any>) {
  if (!response) {
    throw new Error('Null response received.')
  }
}
