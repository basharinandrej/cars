import {Router} from 'express'
import controllerBrand from '@controllers/controller-brand'
import {validationCreateBrand, validationBrandUpdation, validationGetAllBrands} from './validation-brand'
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


routers.get('/getById',
    controllerBrand.getByIdBrand
)


routers.put('', 
    validationBrandUpdation.createChain(),
    middlewareValidation,
    controllerBrand.updateBrand
)


routers.delete('', controllerBrand.dropBrand)

export const routerBrand = routers