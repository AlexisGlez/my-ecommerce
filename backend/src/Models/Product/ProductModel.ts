import mongoose, { Document } from 'mongoose'
import { constants } from '@app-models/constants'
import { UserDocument } from '@app-models/User'

export interface ProductDocument extends Document {
  user: UserDocument
  name: string
  image: string
  brand: string
  category: string
  description: string
  reviews?: [
    {
      name: string
      rating: number
      comment: string
      user: UserDocument
    },
  ]
  rating: number
  numReviews: number
  price: number
  countInStock: number
}

const ReviewSchema = new mongoose.Schema(
  {
    name: constants.requiredString,
    rating: constants.requiredNumber,
    comment: constants.requiredString,
    user: constants.userModelRef,
  },
  constants.schemaOptions,
)

const ProductSchema = new mongoose.Schema(
  {
    user: constants.userModelRef,
    name: constants.requiredString,
    image: constants.requiredString,
    brand: constants.requiredString,
    category: constants.requiredString,
    description: constants.requiredString,
    reviews: [ReviewSchema],
    rating: constants.requiredInteger,
    numReviews: constants.requiredInteger,
    price: constants.requiredFloat,
    countInStock: constants.requiredInteger,
  },
  constants.schemaOptions,
)

export const ProductModel = mongoose.model<ProductDocument>('Product', ProductSchema)
