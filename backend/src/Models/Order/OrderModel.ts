import mongoose, { Document } from 'mongoose'
import { constants } from '@app-models/constants'
import { UserDocument } from '@app-models/User'
import { ProductDocument } from '@app-models/Product'

interface OrderDocument extends Document {
  user: UserDocument
  orderItems: [
    {
      name: string
      qty: number
      image: string
      price: number
      product: ProductDocument
    },
  ]
  shippingAddress: {
    address: string
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  paymentResult?: {
    id: string
    status: string
    update_time: string
    email_address: string
  }
  taxPrice: number
  shippingPrice: number
  totalPrice: number
  isPaid?: boolean
  paidAt?: string
  isDelivered: boolean
  deliveredAt?: string
}

const OrderSchema = new mongoose.Schema(
  {
    user: constants.userModelRef,
    orderItems: [
      {
        name: constants.requiredString,
        qty: constants.requiredNumber,
        image: constants.requiredString,
        price: constants.requiredNumber,
        product: constants.productModelRef,
      },
    ],
    shippingAddress: {
      address: constants.requiredString,
      city: constants.requiredString,
      postalCode: constants.requiredString,
      country: constants.requiredString,
    },
    paymentMethod: constants.requiredString,
    paymentResult: {
      id: constants.string,
      status: constants.string,
      update_time: constants.string,
      email_address: constants.string,
    },
    taxPrice: constants.requiredFloat,
    shippingPrice: constants.requiredFloat,
    totalPrice: constants.requiredFloat,
    isPaid: constants.requiredBoolean,
    paidAt: constants.date,
    isDelivered: constants.requiredBoolean,
    deliveredAt: constants.date,
  },
  constants.schemaOptions,
)

export const OrderModel = mongoose.model<OrderDocument>('Order', OrderSchema)
