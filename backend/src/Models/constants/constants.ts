import mongoose from 'mongoose'

export const constants = {
  string: { type: String },
  date: { type: Date },
  requiredString: { type: String, required: true },
  requiredBoolean: {
    type: Boolean,
    required: true,
    default: false,
  },
  requiredNumber: {
    type: Number,
    required: true,
  },
  requiredInteger: {
    type: Number,
    required: true,
    default: 0,
  },
  requiredFloat: {
    type: Number,
    required: true,
    default: 0.0,
  },
  userModelRef: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  productModelRef: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  schemaOptions: {
    timestamps: true, // add create_at & updated_at fields automatically
  },
}
