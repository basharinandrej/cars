import {Router} from 'express'
import controllerUser from '@controllers/controller-user'

 const routers = Router()


routers.post('/registration', controllerUser.registration)
routers.post('/login', controllerUser.login)
routers.get('', controllerUser.getAllUsers)


export const routerUser = routers