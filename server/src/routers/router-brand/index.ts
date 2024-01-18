import {Router} from 'express'
import controllerBrand from '@controllers/controller-brand'
import {validationCreateBrand} from './validation-brand'
import middlewareValidation from '../middlewares/middleware-validation'

const routers = Router()


routers.post('',
    validationCreateBrand.createChain(),
    middlewareValidation,
    controllerBrand.createBrand
)

routers.get('', controllerBrand.getAllBrands)


export const routerBrand = routers