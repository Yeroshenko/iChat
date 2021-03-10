import dotenv from 'dotenv'
import express from 'express'

import { UserCtrl } from './controllers'
import './core/db'

const app = express()

dotenv.config()

app.use(express.json())

app.post('/user/register', UserCtrl.create)
app.get('/user/:id', UserCtrl.show)
app.delete('/user/:id', UserCtrl.delete)

app.listen(process.env.PORT, (): void => {
  console.log('SERVER RUNNING! IN PORT:', process.env.PORT)
})
