import {Router} from 'express'
import controllerCategory from '@controllers/controller-category'
import middlewareValidation from '../middlewares/middleware-validation'
import {validationCreateCategory} from './validation-category'

const routers = Router()


routers.post('',
    validationCreateCategory.createChain(),
    middlewareValidation,
    controllerCategory.createCategory
)

routers.get('',
    controllerCategory.getAllCategory
)


export const routerCategory = routers