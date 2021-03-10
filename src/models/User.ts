import { model, Schema, Document } from 'mongoose'

import { isEmail } from '../utils'

export interface IUser extends Document {
  email: string
  fullName: string
  password: string
  confirmed: boolean
  avatar: string
  confirmHash: string
  lastSeen: Date
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      require: 'Email address is required',
      validate: [isEmail, 'Invalid email'],
      unique: true
    },

    fullName: {
      type: String,
      required: 'FullName is required'
    },

    password: {
      type: String,
      required: 'Password is required'
    },

    confirmed: {
      type: Boolean,
      default: false
    },

    avatar: String,

    confirmHash: String,

    lastSeen: {
      type: Date,
      default: new Date()
    }
  },
  { timestamps: true }
)

export const UserModel = model<IUser>('User', UserSchema)
