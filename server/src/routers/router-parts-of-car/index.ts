import {Router} from 'express'
import controllerPartsOfCar from '@controllers/controller-parts-of-car'
import middlewareValidation from '../middlewares/middleware-validation'
import {validationCreatePartsOfCar} from './validation-parts-of-car'

const routers = Router()

routers.post('',
    validationCreatePartsOfCar.createChain(),
    middlewareValidation,
    controllerPartsOfCar.createPartsOfCar
)
routers.get('', controllerPartsOfCar.getAllPartsOfCars)

export const routerPartsOfCar = routers