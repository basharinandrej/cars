import {Router} from 'express'
import controllerDetail from '@controllers/controller-detail'
import middlewareValidation from '../middlewares/middleware-validation'
import {validationCreateDetail, validationSearchDetail} from './validation-detail'

const routers = Router()


routers.post('',
    validationCreateDetail.createChain(),
    middlewareValidation,
    controllerDetail.createDetail
)
routers.get('', controllerDetail.getAllDetails)

routers.get('/search', 
    validationSearchDetail.createChain(),
    middlewareValidation,
    controllerDetail.search
)


export const routerDetail = routers