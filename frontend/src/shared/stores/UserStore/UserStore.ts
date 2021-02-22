import { proxy, useProxy } from 'valtio'

import { Fetcher } from '@app-shared/Fetcher'
import { Config } from '@app-shared/Config'
import { Cookies } from '@app-shared/Cookies'

type UserState = {
  currentUser: User | null
}

const state = proxy<UserState>({ currentUser: null })

export class UserStore {
  public static initialize(userState: UserState) {
    state.currentUser = userState.currentUser
  }

  public static async login(
    email: string,
    password: string,
  ): Promise<{ currentUser: User | null } & StateMachine> {
    try {
      const response = await Fetcher.post<User>(Config.Endpoints.login(), {
        data: { email, password },
      })

      if (!response) {
        throw new Error('Null response received.')
      }

      if (response.status >= 400) {
        throw new Error(response.message ?? 'empty error message received.')
      }

      state.currentUser = response.data
      Cookies.set(Cookies.User, state)

      return { currentUser: response.data, state: 'success', error: null }
    } catch (error) {
      state.currentUser = null
      Cookies.remove(Cookies.User)

      console.error('An error occurred while performing login:', error)

      return { currentUser: null, state: 'error', error }
    }
  }

  public static logout() {
    Cookies.remove(Cookies.User)
    state.currentUser = null
  }

  public static useCurrentUser() {
    const snapshot = useProxy(state)

    return snapshot.currentUser
  }
}
