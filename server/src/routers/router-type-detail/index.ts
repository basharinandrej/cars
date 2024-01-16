import {Router, Response} from 'express'
import TypeDetail from '@models/type-detail'
import Detail from '@models/detail'
import {CreateTypeDetailRequest, GetTypeDetailsRequest} from './types'

const routers = Router()

routers.post('', async (req: CreateTypeDetailRequest, res: Response) => {
    const {name, partsOfCarId} = req.body
    
    const typeDetail = await TypeDetail.create<any>({
        name,
        partsOfCarId
    })

    res.send({typeDetail})
})

routers.get('', async (req: GetTypeDetailsRequest, res: Response) => {
    const { limit = 10, offset = 0 } = req.query

    const typeDetail = await TypeDetail?.findAndCountAll({
        limit, offset, include: Detail
    })

    res.send({typeDetail})
})

export const routerTypeDetail = routers