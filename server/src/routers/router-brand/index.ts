import {Router} from 'express'
import controllerBrand from '@controllers/controller-brand'

const routers = Router()


routers.post('', controllerBrand.create)
routers.get('', controllerBrand.getAllBrands)


export const routerBrand = routers