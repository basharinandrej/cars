import {CreateModelDto} from '@common/dtos'
import {ModelAttributes} from '@models/model/types'

class DtoModels {
    createModelDto(model: ModelAttributes): CreateModelDto {
        return {
            name: model.name,
            brandId: model.brandId,
            typeCarId: model.typeCarId
        }
    }
}

export default new DtoModels()