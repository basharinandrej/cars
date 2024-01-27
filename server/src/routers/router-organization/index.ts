import {Router} from 'express'
import controllerOrganization from '@controllers/controller-organization'
import middlewareValidation from '../middlewares/middleware-validation'
import {validationOrganization} from './validation-organization'

const routers = Router()


routers.post('',
    validationOrganization.registrationChain(),
    middlewareValidation,
    controllerOrganization.registrationOrganization
)

routers.get('',
    middlewareValidation,
    controllerOrganization.getAllOrganization
)

routers.get('/getById',
    controllerOrganization.getByIdOrganization
)

export const routerModel = routers