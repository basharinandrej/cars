import {Router} from 'express'
import {routerBrand} from './router-brand'
import {routerModel} from './router-model'
import {routerDetail} from './router-detail'
import {routerTypeCar} from './router-type-car'
import {routerPartsOfCar} from './router-parts-of-car'
import {routerTypeDetail} from './router-type-detail'

const routers = Router()

routers.use('/brand', routerBrand)
routers.use('/model', routerModel)
routers.use('/detail', routerDetail)
routers.use('/type-car', routerTypeCar)
routers.use('/parts-of-car', routerPartsOfCar)
routers.use('/type-detail', routerTypeDetail)

export default routers