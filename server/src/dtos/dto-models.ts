import {CreateModelDto, GetAllModelsDto} from '@common/dtos'
import {ModelAttributes} from '@models/model/types'

class DtoModels {
    createModelDto(model: ModelAttributes): CreateModelDto {
        return {
            name: model.name,
            brandId: model.brandId,
            typeCarId: model.typeCarId
        }
    }

    getAllModelsDto(query): GetAllModelsDto {
        return {
            limit: query.limit,
            offset: query.offset,
            brandId: query.brandId
        }
    }
}

export default new DtoModels()