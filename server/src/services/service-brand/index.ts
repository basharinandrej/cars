import {Response} from 'express'
import {CreateBrandDto, GetBrandDto} from '@common/dto'
import Brand from '@models/brand'
import Model from '@models/model'


class ServiceBrand {
    async create(createBrandDto: CreateBrandDto, res: Response) {

        const brand = await Brand.create({
            name: createBrandDto.name
        })
        res.send({brand})
    }


    async getAllBrands(getBrandsDto: GetBrandDto, res: Response) {

        const brands = await Brand?.findAndCountAll({
            limit: getBrandsDto.limit,
            offset: getBrandsDto.offset,
            include: Model
        })
        res.send({brands})
    }
}


export default new ServiceBrand()