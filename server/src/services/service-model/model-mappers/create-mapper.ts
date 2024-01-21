import Model from '@models/model'
import {CreateModelDto} from '@dtos/dto-model/types'

interface ReturnModelDto extends CreateModelDto {
    id: number
}

export const mapperCreateModel = (model: Model): ReturnModelDto => {
    return {
        id: model.dataValues.id,
        name: model.dataValues.name,
        brandId: model.dataValues.brandId,
        typeCarId: model.dataValues.typeCarId,
    }
}