import {Router} from 'express'
import controllerWear from '@controllers/controller-wear'
import middlewareValidation from '../middlewares/middleware-validation'
import {validationCreateWear} from './validation-wear'

const routers = Router()


routers.post('', 
    validationCreateWear.createChain(),
    middlewareValidation,
    controllerWear.createWear
)

routers.get('', 
    middlewareValidation, 
    controllerWear.getAllWear
)

routers.get('', 
    middlewareValidation, 
    controllerWear.getByIdWear
)


export const routerWear = routers