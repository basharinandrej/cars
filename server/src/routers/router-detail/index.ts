import {Router} from 'express'
import controllerDetail from '@controllers/controller-detail'

const routers = Router()


routers.post('', controllerDetail.createDetail)
routers.get('', controllerDetail.getAllDetails)


export const routerDetail = routers