import {Router} from 'express'
import controllerNotification from '@controllers/controller-notification'


const routers = Router()


routers.get('', controllerNotification.getNotification)


export const routerNotification = routers