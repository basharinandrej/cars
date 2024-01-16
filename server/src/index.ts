import 'module-alias/register'
import express, {Express} from 'express'
import dotenv from 'dotenv';
import {instanceSequelize} from './db'
import './models/associations'

import routers from './routers'

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
app.use('/api', routers)


