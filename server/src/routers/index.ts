import {Router} from 'express'
import {routerBrand} from './router-brand'
import {routerModel} from './router-model'
import {routerDetail} from './router-detail'
import { routerDataBase } from './router-data-base'
import { routerUser } from './router-user'
import { routerCategory } from './router-category'
import {routerWear} from './router-wear'
import {routerCar} from './router-car'

const routers = Router()

routers.use('/brand', routerBrand)
routers.use('/model', routerModel)
routers.use('/detail', routerDetail)
routers.use('/user', routerUser)
routers.use('/category', routerCategory)
routers.use('/wear', routerWear)
routers.use('/car', routerCar)

//For QA
routers.use('/data-base', routerDataBase)

export default routers