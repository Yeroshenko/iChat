import { Document, model, Schema } from 'mongoose'

export interface IDialog extends Document {
  author: string,
  partner: string,
  lastMessage: string
}

const DialogSchema = new Schema<IDialog>(
  {
    author: { type: Schema.Types.ObjectId, require: 'Author is require', ref: 'User' },
    partner: { type: Schema.Types.ObjectId, require: 'Partner is require', ref: 'User' },
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' }
  },
  { timestamps: true }
)

export const DialogModel = model<IDialog>('Dialog', DialogSchema)
