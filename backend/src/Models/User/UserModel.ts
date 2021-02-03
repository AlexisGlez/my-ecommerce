import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcryptjs'

import { constants } from '@app-models/constants'

export interface UserDocument extends Document {
  name: string
  email: string
  password: string
  isAdmin: boolean
  matchPassword: (providedPassword: string) => Promise<boolean>
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

UserSchema.methods.matchPassword = async function (this: UserDocument, providedPassword: string) {
  return bcrypt.compare(providedPassword, this.password)
}

export const UserModel = mongoose.model<UserDocument>('User', UserSchema)
