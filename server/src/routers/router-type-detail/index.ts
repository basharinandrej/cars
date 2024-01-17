import {Router} from 'express'
import controllerTypeDetail from '@controllers/controller-type-detail'

const routers = Router()

routers.post('', controllerTypeDetail.createTypeDetail)
routers.get('', controllerTypeDetail.getAllTypeDetails)

export const routerTypeDetail = routers