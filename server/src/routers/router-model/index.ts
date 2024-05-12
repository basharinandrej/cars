import {Router} from 'express'
import controllerModel from '@controllers/controller-model'
import middlewareValidation from '../middlewares/middleware-validation'
import { validationCreateModel, validationModelUpdation } from './validation-model'

const routers = Router()


routers.post('',
    validationCreateModel.createChain(),
    middlewareValidation,
    controllerModel.createModel
)

routers.get('',
    controllerModel.getAllModels
)

routers.get('/getById', 
    controllerModel.getByIdModel
)

routers.delete('', controllerModel.dropModel)

routers.put('', 
    validationModelUpdation.createChain(),
    middlewareValidation, 
    controllerModel.updateModel
)

export const routerModel = routers