import { DetailCategoryAttributes } from "@models/detail/detail-category/types"
import {DtoDetailCategoryGetAll, DtoDetailCategoryCreation} from "./types"
import {ParamsGetAllCategories} from '@routers/router-detail/router-detail-category/types'
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from "@common/constans"

class DtoDetailCategory {

    getDtoDetailCategoryCreation(category: DetailCategoryAttributes): DtoDetailCategoryCreation {

        return {
            name: category.name
        }
    }

    getDtoGetAllDetailCategory(query: ParamsGetAllCategories): DtoDetailCategoryGetAll {
        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT, 
            offset: query.offset || PAGINATION_DEFAULT_OFFSET
        }
    }
}

export default new DtoDetailCategory()