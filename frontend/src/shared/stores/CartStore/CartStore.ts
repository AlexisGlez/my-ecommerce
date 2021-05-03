import { proxy, useProxy } from 'valtio'

import { Cookies } from '@app-shared/Cookies'

export type CartState = {
  items: Record<string, { product: Product; quantity: number }>
  shipping: ShippingInformation
  payment: {
    method: string
  }
}

const state = proxy<CartState>({
  items: {},
  shipping: { address: '', city: '', postalCode: '', country: '' },
  payment: {
    method: '',
  },
})

export class CartStore {
  public static initialize(savedState: CartState) {
    state.items = { ...savedState.items }
    state.shipping = { ...savedState.shipping }
    state.payment = { ...savedState.payment }
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

  public static removeItemsFromCart() {
    state.items = {}

    Cookies.set(Cookies.Cart, state)
  }

  public static saveShippingAddress(
    address: string,
    city: string,
    postalCode: string,
    country: string,
  ) {
    state.shipping = { address, city, postalCode, country }

    Cookies.set(Cookies.Cart, state)
  }

  public static savePaymentMathod(paymentMathod: string) {
    state.payment.method = paymentMathod

    Cookies.set(Cookies.Cart, state)
  }

  public static useGetCartItems() {
    const snapshot = useProxy(state)

    const items = Object.keys(snapshot.items).map((key) => snapshot.items[key])

    return items
  }

  public static useShippingAddress() {
    const snapshot = useProxy(state)

    return snapshot.shipping
  }

  public static usePaymentMethod() {
    const snapshot = useProxy(state)

    return snapshot.payment
  }

  public static useGetCurrentCart() {
    const snapshot = useProxy(state)

    return snapshot
  }
}
