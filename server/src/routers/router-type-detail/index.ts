import {Router} from 'express'
import controllerTypeDetail from '@controllers/controller-type-detail'
import middlewareValidation from '../middlewares/middleware-validation'
import {validationCreateTypeDetail} from './validation-type-detail'

const routers = Router()

routers.post('',
    validationCreateTypeDetail.createChain(),
    middlewareValidation,
    controllerTypeDetail.createTypeDetail
)
routers.get('', controllerTypeDetail.getAllTypeDetails)

export const routerTypeDetail = routers