import {Router} from 'express'
import {routerBrand} from './router-brand'
import {routerModel} from './router-model'
import {routerDetail} from './router-detail'
import { routerDataBase } from './router-data-base'
import { routerUser } from './router-user'
import { routerCategory } from './router-category'
import {routerWear} from './router-wear'
import {routerCar} from './router-car'
import {routerServiceCategory} from './router-service-category'
import {routerService} from './router-service'
import {routerRequest} from './router-request'
import {routerNotification} from './router-notification'


const routers = Router()

routers.use('/brand', routerBrand)
routers.use('/model', routerModel)
routers.use('/detail', routerDetail)
routers.use('/user', routerUser)
routers.use('/category', routerCategory)
routers.use('/wear', routerWear)
routers.use('/car', routerCar)
routers.use('/service-category', routerServiceCategory)
routers.use('/service', routerService)
routers.use('/request', routerRequest)
routers.use('/notification', routerNotification)

//For QA
routers.use('/data-base', routerDataBase)

export default routers