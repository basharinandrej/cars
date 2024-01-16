import {Router, Response} from 'express'
import Detail from '@models/detail'
import TypeDetail from '@models/type-detail'
import {CreateDetailRequest, GetDetailsRequest} from './types'

const routers = Router()

routers.post('', async (req: CreateDetailRequest, res: Response) => {
    const {
        name,
        vendorCode,
        wear,
        year,
        description,
        price,
        photos,
        state,
        typeDetailId
    } = req.body

    const detail = await Detail.create({
        name,
        vendorCode,
        wear,
        year,
        description,
        price,
        photos,
        state,
        typeDetailId
    })

    res.send(detail)
})

routers.get('', async (req: GetDetailsRequest, res: Response) => {
    const { limit = 10, offset = 0 } = req.query

    const detail = await Detail?.findAndCountAll({
        limit, offset, include: TypeDetail
    })

    res.send({detail})
})

export const routerDetail = routers