import {Router} from 'express'
import controllerTypeCar from "@controllers/controller-type-car"

const routers = Router()


routers.post('', controllerTypeCar.createTypeCar)
routers.get('', controllerTypeCar.getAllTypesCar)


export const routerTypeCar = routers