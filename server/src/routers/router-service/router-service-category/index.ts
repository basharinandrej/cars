import {Router} from 'express'
import middlewareValidation from '../../middlewares/middleware-validation'
import controllerServiceCategory from '@controllers/controller-service/controller-service-category'
import {validationCreateServiceCategory} from './validation-service-category'


const routers = Router()

routers.post(
    '', 
    validationCreateServiceCategory.createChain(),
    middlewareValidation,
    controllerServiceCategory.createServiceCategory
)

routers.get('', 
    middlewareValidation, 
    controllerServiceCategory.getAllServiceCategories
)


export const routerServiceCategory = routers