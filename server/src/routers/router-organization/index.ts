import {Router} from 'express'
import controllerOrganization from '@controllers/controller-organization'
import middlewareValidation from '../middlewares/middleware-validation'
import {validationOrganization, validationOrganizationChangePassword} from './validation-organization'

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
    controllerOrganization.getAllOrganization
)

routers.get('/getById',
    controllerOrganization.getByIdOrganization
)

routers.get('/init', controllerOrganization.initOrganization)

routers.post('/change-password', 
    validationOrganizationChangePassword.createChain(), 
    middlewareValidation, 
    controllerOrganization.changePassword
)

export const routerOrganization = routers