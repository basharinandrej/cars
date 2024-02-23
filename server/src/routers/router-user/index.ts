import {Router} from 'express'
import controllerUser from '@controllers/controller-user'
import {validationUser} from './validation-user'
import middlewareValidation from '../middlewares/middleware-validation'

const routers = Router()


routers.post(
    '/registration', 
    validationUser.registrationChain(),
    middlewareValidation,
    controllerUser.registration
)
routers.post('/login',   
    validationUser.loginChain(),
    middlewareValidation,
    controllerUser.login
)

routers.get('', 
    validationUser.getAllUsersChain(), 
    middlewareValidation, 
    controllerUser.getAllUsers
)

routers.get('/init', controllerUser.initUser)

routers.put('', controllerUser.update)

routers.get('/logout', controllerUser.logout)

//todo добавить endpoint getUserById

export const routerUser = routers