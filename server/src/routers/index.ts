import {Router} from 'express'
import {routerBrand} from './router-brand'
import {routerModel} from './router-model'
import {routerDetail} from './router-detail'
import { routerDataBase } from './router-data-base'
import { routerUser } from './router-user'
import { routerOrganization } from './router-organization'
import { routerDetailCategory } from './router-detail/router-detail-category'
import {routerCar} from './router-car'
import {routerServiceCategory} from './router-service/router-service-category'
import {routerService} from './router-service'
import {routerRequest} from './router-request'
import {routerNotification} from './router-notification'


const routers = Router()

routers.use('/brand', routerBrand)
routers.use('/model', routerModel)
routers.use('/detail', routerDetail)
routers.use('/user', routerUser)
routers.use('/organizations', routerOrganization)
routers.use('/detail-category', routerDetailCategory)
routers.use('/car', routerCar)
routers.use('/service-category', routerServiceCategory)
routers.use('/service', routerService)
routers.use('/request', routerRequest)
routers.use('/notification', routerNotification)

//For QA
routers.use('/data-base', routerDataBase)

export default routers