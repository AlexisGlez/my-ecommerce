import mongoose from 'mongoose'
import { constants } from '@app-models/constants'

const orderSchema = new mongoose.Schema(
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

export const Order = mongoose.model('Order', orderSchema)
