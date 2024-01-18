import {Router} from 'express'
import controllerTypeCar from "@controllers/controller-type-car"
import middlewareValidation from '../middlewares/middleware-validation'
import {validationCreateTypeCar} from './validation-type-car'

const routers = Router()


routers.post('', 
    validationCreateTypeCar.createChain(),
    middlewareValidation,
    controllerTypeCar.createTypeCar
)
routers.get('', controllerTypeCar.getAllTypesCar)


export const routerTypeCar = routers