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

// Hash the password before it gets saved
UserSchema.pre('save', async function (this: UserDocument, next) {
  if (!this.isModified('password')) {
    next()
    return
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

export const UserModel = mongoose.model<UserDocument>('User', UserSchema)
