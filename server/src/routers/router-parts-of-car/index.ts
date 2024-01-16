import {Router, Response} from 'express'
import PartsOfCar from '@models/parts-of-car'
import TypeDetail from '@models/type-detail'
import {GetPartsOfCarRequest, CreatePartsOfCarRequest} from './types'

const routers = Router()

routers.post('', async (req: CreatePartsOfCarRequest, res: Response) => {
    const {
        name,
        typeCarId
    } = req.body

    const partsOfCar: any = await PartsOfCar.create({
        name,
        typeCarId
    })

    res.send({partsOfCar})
})

routers.get('', async (req: GetPartsOfCarRequest, res: Response) => {
    const { limit = 10, offset = 0 } = req.query

    const partsOfCar = await PartsOfCar?.findAndCountAll({
        limit, offset, include: TypeDetail
    })

    res.send({partsOfCar})
})


export const routerPartsOfCar = routers