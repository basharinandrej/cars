import {Router} from 'express'
import middlewareValidation from '../middlewares/middleware-validation'
import controllerOrganizationServiceCategory from '@controllers/controller-organization-service-category'
import {validationServiceCreation} from './validation-service'

const routers = Router()


routers.post('',
    validationServiceCreation.createChain(),
    middlewareValidation,
    controllerOrganizationServiceCategory.createOrganizationServiceCategory
)

routers.get('',
    controllerOrganizationServiceCategory.getAllOrganizationServiceCategories
)

routers.delete('', controllerOrganizationServiceCategory.dropOrganizationServiceCategories)


export const routerOrganizationServiceCategory = routers