import Model from '@models/model'
import {DtoModelCreation} from '@dtos/dto-model/types'

interface ReturnModelDto extends DtoModelCreation {
    id: number
}

export const mapperModelCreation = (model: Model): ReturnModelDto => {
    return {
        id: model.dataValues.id,
        name: model.dataValues.name,
        brandId: model.dataValues.brandId,
    }
}