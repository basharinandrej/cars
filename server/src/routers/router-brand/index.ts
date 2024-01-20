import {Router} from 'express'
import controllerBrand from '@controllers/controller-brand'
import {validationCreateBrand, validationGetAllBrands} from './validation-brand'
import middlewareValidation from '../middlewares/middleware-validation'

const routers = Router()


routers.post('',
    validationCreateBrand.createChain(),
    middlewareValidation,
    controllerBrand.createBrand
)

routers.get('',
    validationGetAllBrands.createChain(),
    middlewareValidation,
    controllerBrand.getAllBrands
)


routers.get('/getOne',
    controllerBrand.getOne
)

export const routerBrand = routers