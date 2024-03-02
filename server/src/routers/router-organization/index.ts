import {Router} from 'express'
import controllerOrganization from '@controllers/controller-organization'
import middlewareValidation from '../middlewares/middleware-validation'
import {validationOrganization} from './validation-organization'

const routers = Router()


routers.post('/registration',
    validationOrganization.registrationChain(),
    middlewareValidation,
    controllerOrganization.registrationOrganization
)

routers.post('/login',
    validationOrganization.loginChain(),
    middlewareValidation,
    controllerOrganization.login
)

routers.get('',
    middlewareValidation,
    controllerOrganization.getAllOrganization
)

routers.get('/getById',
    controllerOrganization.getByIdOrganization
)

routers.get('/init', controllerOrganization.initOrganization)

export const routerOrganization = routers