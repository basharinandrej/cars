import {Router} from 'express'
import middlewareValidation from '../middlewares/middleware-validation'
import {validationCreateRequest, validationRequestUpdation} from './validation-request'
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

routers.put('', 
    validationRequestUpdation.createChain(),
    middlewareValidation,
    controllerRequest.updateRequest
)


export const routerRequest = routers