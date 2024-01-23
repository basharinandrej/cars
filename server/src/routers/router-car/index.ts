import {Router} from 'express'
import middlewareValidation from '../middlewares/middleware-validation'
import conterollerCar from '@controllers/controller-car'
import {validationCarCreation} from './validation-car'


const routers = Router()

routers.post('',
    validationCarCreation.createChain(),
    middlewareValidation,
    conterollerCar.createCar
)

routers.get('',
    middlewareValidation, 
    conterollerCar.getAllCars
)

routers.get('/getByVINCode', 
    middlewareValidation,
    conterollerCar.getByVINCodeCar
)

export const routerCar = routers