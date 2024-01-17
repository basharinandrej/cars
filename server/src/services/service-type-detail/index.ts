import {Response} from 'express'
import {CreateTypeDetailDto, GetTypeDetailsDto} from '@common/dtos'
import TypeDetail from '@models/type-detail'
import Detail from '@models/detail'


class ServiceTypeDetail {
    async createTypeDetail(createTypeDetailDto: CreateTypeDetailDto, res: Response) {

        const typeDetail = await TypeDetail.create({
            name: createTypeDetailDto.name
        })
        res.send({typeDetail})
    }


    async getAllTypeDetails(getTypeDetailsDto: GetTypeDetailsDto, res: Response) {

        const typeDetails = await TypeDetail?.findAndCountAll({
            limit: getTypeDetailsDto.limit,
            offset: getTypeDetailsDto.offset,
            include: Detail
        })
        res.send({typeDetails})
    }
}


export default new ServiceTypeDetail()