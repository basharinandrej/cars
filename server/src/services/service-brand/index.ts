import {Response} from 'express'
import {CreateBrandDto, GetBrandsDto} from '@common/dto'
import Brand from '@models/brand'
import Model from '@models/model'


class ServiceBrand {
    async createBrand(createBrandDto: CreateBrandDto, res: Response) {

        const brand = await Brand.create({
            name: createBrandDto.name
        })
        res.send({brand})
    }


    async getAllBrands(getBrandsDto: GetBrandsDto, res: Response) {

        const brands = await Brand?.findAndCountAll({
            limit: getBrandsDto.limit,
            offset: getBrandsDto.offset,
            include: Model
        })
        res.send({brands})
    }
}


export default new ServiceBrand()