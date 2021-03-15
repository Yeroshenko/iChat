import { Request, Response } from 'express'
import { DialogModel, MessageModel } from '../models'

class DialogController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { author, partner, text } = req.body

      const dialog = await DialogModel.create({ author, partner })
      const message = new MessageModel({ text, user: author, dialog: dialog._id })
      await message.save()

      res.status(201).json({ success: true, data: dialog })
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  }

  async show(_: Request, res: Response): Promise<void> {
    const authorId = '6048b63bc53bcc39d4304524'

    try {
      DialogModel.find({ author: authorId })
        .populate(['author', 'partner'])
        .exec()
        .then(dialogs => res.json({ success: true, data: dialogs }))
        .catch(() =>
          res.status(404).json({ success: false, message: 'Dialogs fot found' })
        )

    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      DialogModel.deleteOne({ _id: id })
        .then(() => res.json({ success: true, data: id }))
        .catch(() =>
          res.status(404).json({ success: false, message: 'Invalid id' })
        )
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  }
}

export const DialogCtrl = new DialogController()
