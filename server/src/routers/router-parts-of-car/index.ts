import {Router} from 'express'
import controllerPartsOfCar from '@controllers/controller-parts-of-car'

const routers = Router()

routers.post('', controllerPartsOfCar.createPartsOfCar)
routers.get('', controllerPartsOfCar.getAllPartsOfCars)

export const routerPartsOfCar = routers