import {Router} from 'express'
import controllerCategory from '@controllers/controller-detail/controller-detail-category'
import middlewareValidation from '../../middlewares/middleware-validation'
import {validationCreateDetailCategory, validationUpdateDetailCategory} from './validation-detail-category'

const routers = Router()


routers.post('',
    validationCreateDetailCategory.createChain(),
    middlewareValidation,
    controllerCategory.createDetailCategory
)

routers.get('',
    controllerCategory.getAllDetailCategory
)

routers.delete('', controllerCategory.dropCategoryDetail)

routers.put('', 
    validationUpdateDetailCategory.createChain(),
    middlewareValidation,
    controllerCategory.updateCategoryDetail
)

export const routerDetailCategory = routers