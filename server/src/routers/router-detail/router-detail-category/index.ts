import {Router} from 'express'
import controllerCategory from '@controllers/controller-detail/controller-detail-category'
import middlewareValidation from '../../middlewares/middleware-validation'
import {validationCreateDetailCategory} from './validation-detail-category'

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


export const routerDetailCategory = routers