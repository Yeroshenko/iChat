import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()

app.use(express.json())

app.listen(process.env.PORT, (): void => {
  console.log('SERVER RUNNING! IN PORT:', process.env.PORT)
})
