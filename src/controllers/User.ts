import { Request, Response } from 'express'

import { UserModel } from '../models'
import { generateMD5 } from '../utils'

class UserController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = {
        email: req.body.email,
        fullName: req.body.fullName,
        password: req.body.password,
        confirmHash: generateMD5(
          process.env.SECRET_KEY || Math.random().toString()
        )
      }

      const user = await UserModel.create(data)

      res.status(201).json({ success: true, data: user })
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  }

  async show(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      UserModel.findById(id)
        .then(user => res.json({ success: true, data: user }))
        .catch(() =>
          res.status(404).json({ success: false, message: 'User not found' })
        )
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      UserModel.deleteOne({ _id: id })
        .then(() => res.json({ success: true, data: id }))
        .catch(() =>
          res.status(404).json({ success: false, message: 'User not found' })
        )
    } catch (err) {
      res.status(500).json({ success: false, message: err })
    }
  }
}

export const UserCtrl = new UserController()
