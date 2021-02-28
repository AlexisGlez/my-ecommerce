type Product = {
  _id: string
  name: string
  image: string
  description: string
  brand: string
  category: string
  price: number
  countInStock: number
  rating: number
  numReviews: number
}

type Products = Array<Product>

type User = {
  _id: string
  name: string
  email: string
  isAdmin: boolean
  token: string
}

type Order = {
  createdAt: string
  isDelivered: boolean
  isPaid: boolean
  orderItems: Array<Product>
  paymentMethod: string
  shippingAddress: { address: string; city: string; postalCode: string; country: string }
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  updatedAt: string
  user: string
  __v: number
  _id: string
}

type State = 'idle' | 'loading' | 'error' | 'success'

type StateMachine = {
  state: State
  error: string | null
}
