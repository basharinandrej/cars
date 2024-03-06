import {Router} from 'express'
import middlewareValidation from '../middlewares/middleware-validation'
import controllerServiceCategory from '@controllers/controller-service-category'
import {validationCreateServiceCategory, validationUpdateServiceCategory} from './validation-service-category'


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

routers.delete('', controllerServiceCategory.dropCategoryDetail)

routers.put('', 
    validationUpdateServiceCategory.createChain(),
    middlewareValidation,
    controllerServiceCategory.updateCategoryService
)

export const routerServiceCategory = routers