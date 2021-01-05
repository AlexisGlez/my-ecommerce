import mongoose from 'mongoose'
import { constants } from '@app-models/constants'

const reviewSchema = new mongoose.Schema(
  {
    name: constants.requiredString,
    rating: constants.requiredNumber,
    comment: constants.requiredString,
    user: constants.userModelRef,
  },
  constants.schemaOptions,
)

const productSchema = new mongoose.Schema(
  {
    user: constants.userModelRef,,
    name: constants.requiredString,
    image: constants.requiredString,
    brand: constants.requiredString,
    category: constants.requiredString,
    description: constants.requiredString,
    reviews: [reviewSchema],
    rating: constants.requiredInteger,
    numReviews: constants.requiredInteger,
    price: constants.requiredFloat,
    countInStock: constants.requiredInteger,
  },
  constants.schemaOptions,
)

export const Product = mongoose.model('Product', productSchema)
