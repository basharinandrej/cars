import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from '@common/constans'
import {DtoModelCreation, DtoModelGetAll, DtoModelGetById} from './types'
import {ModelAttributes} from '@models/model/types'
import {ParamsGetAllModels, ParamsGetOneModel} from '@controllerscontroller-model/types'

class DtoModels {
    getDtoModelCreation(model: ModelAttributes): DtoModelCreation {
        return {
            name: model.name,
            brandId: model.brandId,
        }
    }

    getDtoModelsGetAll(query: ParamsGetAllModels): DtoModelGetAll {
        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET,
            brandId: query.brandId
        }
    }

    getDtoModelGetById(query: ParamsGetOneModel): DtoModelGetById {
        return {
            id: query.id
        }
    }
}

export default new DtoModels()