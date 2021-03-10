import { model, Schema, Document } from 'mongoose'

import { generateMD5, isEmail } from '../utils'

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
      select: false,
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

UserSchema.pre<IUser>('save', async function (next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  user.password = await generateMD5(user.password)
  user.confirmHash = await generateMD5(new Date().toString())
})

export const UserModel = model<IUser>('User', UserSchema)
