import { isServer } from '@app-shared/utils/isServer'
import { Config } from '@app-shared/Config'
import { UserStore } from '@app-stores/UserStore'

export function check4xxErrors(response: Fetcher.Response<any>) {
  if (!response) {
    return
  }

  if (response.status === 401 && !isServer()) {
    UserStore.logout()
    window.history.pushState({}, '', Config.Routes.login())
  }

  if (response.status >= 400) {
    throw new Error(response.message ?? 'empty error message received.')
  }
}
