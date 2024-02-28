import {Router} from 'express'
import controllerDetail from '@controllers/controller-detail'
import middlewareValidation from '../middlewares/middleware-validation'
import {validationCreateDetail, validationGetByIdDetail} from './validation-detail'

const routers = Router()


routers.post('',
    validationCreateDetail.createChain(),
    middlewareValidation,
    controllerDetail.createDetail
)
routers.get('', controllerDetail.getAllDetails)

routers.get('/getById', 
    validationGetByIdDetail.createChain(),
    middlewareValidation,
    controllerDetail.getByIdDetail
)

routers.delete('', controllerDetail.dropDetail)

export const routerDetail = routers