import mongoose, { Document } from 'mongoose'
import { constants } from '@app-models/constants'

export interface UserDocument extends Document {
  name: string
  email: string
  password: string
  isAdmin: boolean
}

const UserSchema = new mongoose.Schema(
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

export const UserModel = mongoose.model<UserDocument>('User', UserSchema)
