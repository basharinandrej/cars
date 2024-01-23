import {Router} from 'express'
import controllerModel from '@controllers/controller-model'
import middlewareValidation from '../middlewares/middleware-validation'
import { validationCreateModel, validationGetAllModels } from './validation-model'

const routers = Router()


routers.post('',
    validationCreateModel.createChain(),
    middlewareValidation,
    controllerModel.createModel
)

routers.get('',
    validationGetAllModels.createChain(),
    middlewareValidation, 
    controllerModel.getAllModels
)

routers.get('/getById', 
    controllerModel.getByIdModel
)

export const routerModel = routers