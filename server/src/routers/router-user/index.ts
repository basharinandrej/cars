import {Router} from 'express'
import controllerUser from '@controllers/controller-user'
import {validationUser, validationUserUpdation, validationUserChangePassword} from './validation-user'
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

routers.get('/init', 
    controllerUser.initUser
)

// todo добавить ручку обновления профиля
routers.patch('', 
    validationUserUpdation.createChain(), 
    middlewareValidation, 
    controllerUser.update
)

routers.get('/logout', 
    controllerUser.logout
)

routers.delete('', 
    controllerUser.dropUser
)

routers.post('/change-password', 
    validationUserChangePassword.createChain(), 
    middlewareValidation, 
    controllerUser.changePassword
)

//todo добавить endpoint getUserById
//todo добавить endpoint dropPassword

export const routerUser = routers