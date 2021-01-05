import mongoose from 'mongoose'
import { constants } from '@app-models/constants'

const userSchema = new mongoose.Schema(
  {
    name: constants.requiredString,
    email: {
      ...constants.requiredString,
      unique: true,
    },
    password: constants.requiredString,
    isAdmin: constants.requiredBoolean,
  },
  constants.schemaOptions,
)

export const User = mongoose.model('User', userSchema)
