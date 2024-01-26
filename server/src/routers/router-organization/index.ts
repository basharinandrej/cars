import {Router} from 'express'
import controllerOrganization from '@controllers/controller-organization'

const routers = Router()


routers.post('',
    controllerOrganization.createOrganization
)

routers.get('',
    controllerOrganization.getAllOrganization
)

routers.get('',
    controllerOrganization.getByIdOrganization
)

export const routerModel = routers