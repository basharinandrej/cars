import {Router} from 'express'
import controllerCategory from '@controllers/controller-category'
import middlewareValidation from '../middlewares/middleware-validation'


const routers = Router()


routers.post('',
    middlewareValidation,
    controllerCategory.createCategory
)
// routers.get('', controllerCategory.getAllCategory)


export const routerCategory = routers