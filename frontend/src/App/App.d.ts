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

type ShippingInformation = {
  address: string
  city: string
  postalCode: string
  country: string
}

type Order = {
  createdAt: string
  isDelivered: boolean
  isPaid: boolean
  orderItems: Array<Product>
  paymentMethod: string
  shippingAddress: ShippingInformation
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  updatedAt: string
  user: string
  __v: number
  _id: string
}

type OrderDetails = {
  orderItems: Array<{
    name: string
    qty: number
    image: string
    price: number
    product: string
  }>
  user: {
    _id: string
    name: string
    email: string
  }
  paidAt?: string
  deliveredAt?: string
} & Order

type State = 'idle' | 'loading' | 'error' | 'success'

type StateMachine = {
  state: State
  error: string | null
}

type PaymentResult = {}
