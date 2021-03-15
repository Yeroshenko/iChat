import { Document, model, Schema } from 'mongoose'

export interface IMessage extends Document {
  dialog: string
  text: string
  user: string
  unread: boolean
}

const MessageSchema = new Schema<IMessage>(
  {
    text: String,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    read: { type: Boolean, default: false },
    dialog: { type: Schema.Types.ObjectId, ref: 'Dialog', required: true }
  },
  { timestamps: true }
)

export const MessageModel = model<IMessage>('Message', MessageSchema)
