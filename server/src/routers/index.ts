import {Router} from 'express'
import {routerBrand} from './router-brand'
import {routerModel} from './router-model'
import {routerDetail} from './router-detail'
import {routerTypeCar} from './router-type-car'
import {routerPartsOfCar} from './router-parts-of-car'
import {routerTypeDetail} from './router-type-detail'
import { routerDataBase } from './router-data-base'
import { routerUser } from './router-user'

const routers = Router()

routers.use('/type-car', routerTypeCar)
routers.use('/brand', routerBrand)
routers.use('/model', routerModel)
routers.use('/detail', routerDetail)
routers.use('/parts-of-car', routerPartsOfCar)
routers.use('/type-detail', routerTypeDetail)
routers.use('/data-base', routerDataBase)
routers.use('/user', routerUser)

export default routers