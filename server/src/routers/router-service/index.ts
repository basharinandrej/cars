import {Router} from 'express'
import middlewareValidation from '../middlewares/middleware-validation'
import controllerService from '@controllers/controller-service'
import {validationServiceCreation} from './validation-service'

const routers = Router()


routers.post('',
    validationServiceCreation.createChain(),
    middlewareValidation,
    controllerService.createService
)

routers.get('',
    middlewareValidation, 
    controllerService.getAllServices
)


export const routerService = routers