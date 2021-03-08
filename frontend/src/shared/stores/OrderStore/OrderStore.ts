import { proxy, useProxy } from 'valtio'

import { Fetcher } from '@app-shared/Fetcher'
import { Config } from '@app-shared/Config'
import { CartState } from '@app-shared/stores/CartStore'

type OrdersState = {
  orders: Array<Order>
  paypalClientId: string
}

const state = proxy<OrdersState>({
  orders: [],
  paypalClientId: '',
})

export class OrderStore {
  public static initialize(savedState: OrdersState) {
    state.orders = [...savedState.orders]
  }

  public static async createOrder(
    currentUser: User,
    currentCart: CartState,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
  ): Promise<{ order: Order | null } & StateMachine> {
    const orderItems = Object.keys(currentCart.items).map((key) => {
      const item = currentCart.items[key]

      return {
        name: item.product.name,
        qty: item.quantity,
        image: item.product.image,
        price: item.product.price,
        product: item.product,
      }
    })

    try {
      let response = await Fetcher.post<Order>(Config.Endpoints.orders(), {
        data: {
          orderItems,
          shippingAddress: currentCart.shipping,
          paymentMethod: currentCart.payment.method,
          taxPrice,
          shippingPrice,
          totalPrice,
        },
        headers: { Authorization: `Bearer ${currentUser.token}` },
      })

      if (!response) {
        throw new Error('Null response received.')
      }

      if (response.status >= 400) {
        throw new Error(response.message ?? 'empty error message received.')
      }

      return { order: response.data, state: 'success', error: null }
    } catch (error) {
      console.error(`An error occurred while creating the order:`, error)

      return { order: null, state: 'error', error: error.message }
    }
  }

  public static async getOrderById(
    currentUser: User,
    orderId: string,
  ): Promise<{ order: OrderDetails | null } & StateMachine> {
    try {
      let response = await Fetcher.get<OrderDetails>(Config.Endpoints.orderById(orderId), {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      })

      if (!response) {
        throw new Error('Null response received.')
      }

      if (response.status >= 400) {
        throw new Error(response.message ?? 'empty error message received.')
      }

      return { order: response.data, state: 'success', error: null }
    } catch (error) {
      console.error(`An error occurred while getting order by id:`, error)

      return { order: null, state: 'error', error: error.message }
    }
  }

  public static async payOrder(
    currentUser: User,
    orderId: string,
    paymentResult: PaymentResult,
  ): Promise<{ order: OrderDetails | null } & StateMachine> {
    try {
      let response = await Fetcher.patch<OrderDetails>(Config.Endpoints.payOrder(orderId), {
        data: paymentResult,
        headers: { Authorization: `Bearer ${currentUser.token}` },
      })

      if (!response) {
        throw new Error('Null response received.')
      }

      if (response.status >= 400) {
        throw new Error(response.message ?? 'empty error message received.')
      }

      return { order: response.data, state: 'success', error: null }
    } catch (error) {
      console.error(`An error occurred while getting order by id:`, error)

      return { order: null, state: 'error', error: error.message }
    }
  }

  public static async getPaypalClientId(): Promise<{ paypalId: string | null } & StateMachine> {
    try {
      let response = await Fetcher.get<string>(Config.Endpoints.paypalId())

      if (!response) {
        throw new Error('Null response received.')
      }

      return { paypalId: response.data, state: 'success', error: null }
    } catch (error) {
      console.error(`An error occurred while getting paypal id:`, error)

      return { paypalId: null, state: 'error', error: error.message }
    }
  }

  public static async getAllOrders(
    currentUser: User,
  ): Promise<{ orders: Array<OrderDetails> } & StateMachine> {
    try {
      let response = await Fetcher.get<Array<OrderDetails>>(Config.Endpoints.allOrders(), {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      })

      if (!response) {
        throw new Error('Null response received.')
      }

      if (response.status >= 400) {
        throw new Error(response.message ?? 'empty error message received.')
      }

      return { orders: response.data, state: 'success', error: null }
    } catch (error) {
      console.error(`An error occurred while getting user orders:`, error)

      return { orders: [], state: 'error', error: error.message }
    }
  }

  public static useGetPlacedOrders() {
    const snapshot = useProxy(state)

    return snapshot.orders
  }
}
