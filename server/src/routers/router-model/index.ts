import {Router} from 'express'
import controllerModel from '@controllers/controller-model'

const routers = Router()


routers.post('', controllerModel.createModel)
routers.get('', controllerModel.getAllModels)


export const routerModel = routers