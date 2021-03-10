import dotenv from 'dotenv'
import express, { Request, Response } from 'express'

import './core/db'

const app = express()

dotenv.config()

app.use(express.json())

app.get('/', (_: Request, res: Response) => {
  res.json({ status: 'OK' })
})

app.listen(process.env.PORT, (): void => {
  console.log('SERVER RUNNING! IN PORT:', process.env.PORT)
})
