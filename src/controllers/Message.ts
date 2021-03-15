import { Request, Response } from 'express'
import { MessageModel } from '../models'

class MessageController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = {
        text: req.body.text,
        dialog: req.body.dialogId,
        user: req.body.userId || '6048abef8f907f2efcf51e1c'
      }

      const message = await MessageModel.create(data)

      res.status(201).json({ success: true, data: message })
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  }

  async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      MessageModel.find({ dialog: id })
        .populate(['dialog'])
        .exec()
        .then(messages => res.json({ success: true, data: messages }))
        .catch(() =>
          res.status(404).json({ success: false, message: 'Messages fot found' })
        )
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      MessageModel.deleteOne({ _id: id })
        .then(() => res.json({ success: true, data: id }))
        .catch(() =>
          res.status(404).json({ success: false, message: 'Invalid id' })
        )
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  }
}

export const MessageCtrl = new MessageController()
