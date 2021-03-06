import { proxy, useProxy } from 'valtio'

import { Fetcher } from '@app-shared/Fetcher'
import { Config } from '@app-shared/Config'
import { Cookies } from '@app-shared/Cookies'
import { CartStore } from '@app-stores/CartStore'
import { checkNullResponse, check4xxErrors } from '@app-stores/utils'

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
    return UserStore.performUserOperation('login', { email, password })
  }

  public static logout() {
    CartStore.removeItemsFromCart()
    Cookies.remove(Cookies.User)
    state.currentUser = null
  }

  public static async register(
    name: string,
    email: string,
    password: string,
  ): Promise<{ currentUser: User | null } & StateMachine> {
    return UserStore.performUserOperation('register', { name, email, password })
  }

  public static async updateUserProfile(name: string, password: string) {
    return UserStore.performUserOperation('update', { name, password })
  }

  private static async performUserOperation(
    type: 'login' | 'register' | 'update',
    data: any,
  ): Promise<{ currentUser: User | null } & StateMachine> {
    try {
      let response: Fetcher.Response<User>
      if (type === 'update') {
        response = await Fetcher.patch<User>(Config.Endpoints.userProfile(), {
          data,
          headers: { Authorization: `Bearer ${state.currentUser?.token}` },
        })
      } else {
        response = await Fetcher.post<User>(
          type === 'login' ? Config.Endpoints.login() : Config.Endpoints.users(),
          {
            data,
          },
        )
      }

      checkNullResponse(response)
      check4xxErrors(response)

      state.currentUser = response!.data
      Cookies.set(Cookies.User, state)

      return { currentUser: response!.data, state: 'success', error: null }
    } catch (error) {
      state.currentUser = null
      Cookies.remove(Cookies.User)

      console.error(`An error occurred while performing ${type}:`, error)

      return { currentUser: null, state: 'error', error }
    }
  }

  public static async getAllUsers(): Promise<{ users: Array<User> | null } & StateMachine> {
    try {
      const response = await Fetcher.get<Array<User>>(Config.Endpoints.users(), {
        headers: { Authorization: `Bearer ${state.currentUser?.token}` },
      })

      checkNullResponse(response)
      check4xxErrors(response)

      return { users: response!.data, state: 'success', error: null }
    } catch (error) {
      console.error(`An error occurred while retrieving users:`, error)
      return { users: null, state: 'error', error: error.message }
    }
  }

  public static async deleteUser(
    userId: string,
  ): Promise<{ wasUserDeleted: boolean | null } & StateMachine> {
    try {
      const response = await Fetcher.delete<boolean>(Config.Endpoints.userById(userId), {
        headers: { Authorization: `Bearer ${state.currentUser?.token}` },
      })

      checkNullResponse(response)
      check4xxErrors(response)

      return { wasUserDeleted: response!.data, state: 'success', error: null }
    } catch (error) {
      console.error(`An error occurred while deleting user:`, error)
      return { wasUserDeleted: null, state: 'error', error: error.message }
    }
  }

  public static async getUserById(userId: string): Promise<{ user: User | null } & StateMachine> {
    try {
      const response = await Fetcher.get<User>(Config.Endpoints.userById(userId), {
        headers: { Authorization: `Bearer ${state.currentUser?.token}` },
      })

      checkNullResponse(response)
      check4xxErrors(response)

      return { user: response!.data, state: 'success', error: null }
    } catch (error) {
      console.error(`An error occurred while getting user:`, error)
      return { user: null, state: 'error', error: error.message }
    }
  }

  public static async updateUserById(
    userId: string,
    name: string,
    isAdmin: boolean,
  ): Promise<{ user: User | null } & StateMachine> {
    try {
      const response = await Fetcher.patch<User>(Config.Endpoints.userById(userId), {
        data: { name, isAdmin },
        headers: { Authorization: `Bearer ${state.currentUser?.token}` },
      })

      checkNullResponse(response)
      check4xxErrors(response)

      return { user: response!.data, state: 'success', error: null }
    } catch (error) {
      console.error(`An error occurred while updating user:`, error)
      return { user: null, state: 'error', error: error.message }
    }
  }

  public static useCurrentUser() {
    const snapshot = useProxy(state)

    return snapshot.currentUser
  }
}
