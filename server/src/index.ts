import 'module-alias/register'
import express, {Express} from 'express'
import dotenv from 'dotenv';
import {instanceSequelize} from './db'
import './models/associations'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import middlewareError from './middlewares/middleware-error'
import cors from 'cors'
import routers from './routers'
import path from 'path'

dotenv.config();

const app: Express = express()
const PORT =  process.env.PORT || 3000

app.listen(PORT, async () => {
  try {
    await instanceSequelize?.sync()
    console.log(`Server started on ${PORT} port.....`)
  } catch (error) {
    console.error('Error', error)
  }
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3001'
}))
app.use(express.static( path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', routers)

// last middleware
app.use(middlewareError)


