import {Router} from 'express'
import controllerDataBase from '@controllers/controller-data-base'

const routers = Router()


routers.get('/drop', controllerDataBase.drop)


export const routerDataBase = routers