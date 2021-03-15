import dotenv from 'dotenv'
import express from 'express'

import { DialogCtrl, MessageCtrl, UserCtrl } from './controllers'
import './core/db'

const app = express()

dotenv.config()

app.use(express.json())

// TODO: JWT
// TODO: express-validation

app.post('/user/registration', UserCtrl.create)
app.get('/user/:id', UserCtrl.show)
app.delete('/user/:id', UserCtrl.delete)

app.get('/dialogs', DialogCtrl.show)
app.post('/dialogs', DialogCtrl.create)
app.delete('/dialogs/:id', DialogCtrl.delete)

app.get('/messages/:id', MessageCtrl.show)
app.post('/messages', MessageCtrl.create)
app.delete('/messages/:id', MessageCtrl.delete)

app.listen(process.env.PORT, (): void => {
  console.log('SERVER RUNNING! IN PORT:', process.env.PORT)
})
