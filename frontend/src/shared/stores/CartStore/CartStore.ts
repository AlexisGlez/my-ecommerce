import { proxy, useProxy } from 'valtio'

import { Cookies } from '@app-shared/Cookies'

type CartState = {
  items: Record<string, { product: Product; quantity: number }>
}

const state = proxy<CartState>({ items: {} })

export class CartStore {
  public static initialize(savedState: CartState) {
    state.items = { ...savedState.items }
  }

  public static addProductToCart(product: Product, quantity: number) {
    if (state.items[product._id]) {
      state.items[product._id].quantity = quantity
    } else {
      state.items[product._id] = {
        product,
        quantity,
      }
    }

    Cookies.set(Cookies.Cart, state)
  }

  public static removeItemFromCart(product: Product) {
    if (state.items[product._id]) {
      delete state.items[product._id]
    }

    Cookies.set(Cookies.Cart, state)
  }

  public static useGetCartItems() {
    const snapshot = useProxy(state)

    const items = Object.keys(snapshot.items).map((key) => snapshot.items[key])

    return items
  }
}
