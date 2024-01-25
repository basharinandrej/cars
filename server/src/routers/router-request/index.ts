import {Router} from 'express'
import middlewareValidation from '../middlewares/middleware-validation'
import {validationCreateRequest} from './validation-request'
import controllerRequest from '@controllers/controller-request'


const routers = Router()


routers.post('',
    validationCreateRequest.createChain(),
    middlewareValidation,
    controllerRequest.createRequest
)

routers.get('',
    controllerRequest.getAllRequest
)

routers.get('/getById', 
    controllerRequest.getByIdRequest
)

export const routerRequest = routers