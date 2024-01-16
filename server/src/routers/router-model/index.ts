import {Router, Response} from 'express'
import Model from '@models/model'
import Brand from '@models/brand'
import TypeCar from '@models/type-car'
import {CreateModelRequest, getModelsRequest} from './types'

const routers = Router()

routers.post('', async (req: CreateModelRequest, res: Response) => {
    const {name, brandId, typeCarId} = req.body

    const model = await Model.create<any>({
        name,
        brandId,
        typeCarId
    })

    res.send({model})
})

routers.get('', async (req: getModelsRequest, res: Response) => {
    const { limit = 10, offset = 0 } = req.query

    const model = await Model?.findAndCountAll({
        limit, offset, include: [TypeCar,Brand]
    })

    res.send({model})
})

export const routerModel = routers