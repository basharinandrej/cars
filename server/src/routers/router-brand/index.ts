import {Router} from 'express'
import controllerBrand from '@controllers/controller-brand'

const routers = Router()


routers.post('', controllerBrand.createBrand)
routers.get('', controllerBrand.getAllBrands)


export const routerBrand = routers