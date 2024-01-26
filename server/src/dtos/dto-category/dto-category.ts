import { CategoryAttributes } from "@modelsdetail/detail-category/types"
import {DtoCategoryCreation, DtoCategoryGetAll} from "./types"
import {ParamsGetAllCategories} from '@routers/router-category/types'
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from "@common/constans"

class DtoCategory {

    getDtoCategoryCreation(category: CategoryAttributes): DtoCategoryCreation {

        return {
            id: category.id,
            name: category.name
        }
    }

    getDtoGetAllCategory(query: ParamsGetAllCategories): DtoCategoryGetAll {
        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT, 
            offset: query.offset || PAGINATION_DEFAULT_OFFSET
        }
    }
}

export default new DtoCategory()