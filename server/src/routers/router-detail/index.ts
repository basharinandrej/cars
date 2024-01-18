import {Router} from 'express'
import controllerDetail from '@controllers/controller-detail'
import middlewareValidation from '../middlewares/middleware-validation'
import {validationCreateDetail} from './validation-detail'

const routers = Router()


routers.post('',
    validationCreateDetail.createChain(),
    middlewareValidation,
    controllerDetail.createDetail
)
routers.get('', controllerDetail.getAllDetails)


export const routerDetail = routers