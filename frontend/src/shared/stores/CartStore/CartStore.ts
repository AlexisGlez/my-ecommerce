import { proxy, useProxy } from 'valtio'

type CartState = {
  items: Record<string, { product: Product; quantity: number }>
}

const state = proxy<CartState>({ items: {} })

export class CartStore {
  public static addProductToCart(product: Product, quantity: number) {
    if (state.items[product._id]) {
      state.items[product._id].quantity = quantity
    } else {
      state.items[product._id] = {
        product,
        quantity,
      }
    }
  }

  public static useGetCartItems() {
    const snapshot = useProxy(state)

    const items = Object.keys(snapshot.items).map((key) => snapshot.items[key])

    return items
  }
}
