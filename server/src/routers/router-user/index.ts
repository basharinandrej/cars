import {Router} from 'express'
import controllerUser from '@controllers/controller-user'
import {validationUser} from './validation-user'
import middlewareValidation from '../middlewares/middleware-validation'

const routers = Router()


routers.post('/registration', controllerUser.registration)
routers.post('/login', controllerUser.login)

routers.get('', 
    validationUser.getAllUsersChain(), 
    middlewareValidation, 
    controllerUser.getAllUsers
)


export const routerUser = routers