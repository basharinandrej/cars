import {Router, Response} from 'express'
import Brand from '@models/brand'
import Model from '@models/model'
import {CreateBrandRequest, getBrandsRequest} from './types'

const routers = Router()

routers.post('', async (req: CreateBrandRequest, res: Response) => {
    const {name} = req.body

    const brand = await Brand.create({
        name
    })

    res.send({brand})
})

routers.get('', async (req: getBrandsRequest, res: Response) => {
    const { limit = 10, offset = 0 } = req.query

    const brand = await Brand?.findAndCountAll({
        limit, offset, include: Model
    })

    res.send({brand})
})

export const routerBrand = routers