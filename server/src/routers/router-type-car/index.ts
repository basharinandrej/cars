import {Router, Response} from 'express'
import TypeCar from '@models/type-car'
import PartsOfCar from '@models/parts-of-car'
import {CreateTypeCarRequest, GetTypeCarRequest} from './types'

const routers = Router()

routers.post('', async (req: CreateTypeCarRequest, res: Response) => {
    const {name} = req.body

    const typeCar = await TypeCar.create<any>({
        name
    })

    res.send({typeCar})
})

routers.get('', async (req: GetTypeCarRequest, res: Response) => {
    const { limit = 10, offset = 0 } = req.query

    const typeCar = await TypeCar?.findAndCountAll({
        limit, offset, include: PartsOfCar
    })

    res.send({typeCar})
})

export const routerTypeCar = routers