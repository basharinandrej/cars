import {CreateModelDto, GetAllModelsDto, GetOneModelDto} from '@common/dtos'
import {ModelAttributes} from '@models/model/types'
import {GetModels, GetOneModel} from '@routers/router-model/types'

class DtoModels {
    createModelDto(model: ModelAttributes): CreateModelDto {
        return {
            name: model.name,
            brandId: model.brandId,
            typeCarId: model.typeCarId
        }
    }

    getAllModelsDto(query: GetModels): GetAllModelsDto {
        return {
            limit: query.limit,
            offset: query.offset,
            brandId: query.brandId
        }
    }

    getOneModelDto(query: GetOneModel): GetOneModelDto {
        return {
            id: query.id
        }
    }
}

export default new DtoModels()