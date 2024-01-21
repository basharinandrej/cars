import { CategoryAttributes } from "@models/category/types"
import {CreateCategoryDto, DtoCategoryGetAll} from "./types"
import {GetCategory} from '@routers/router-category/types'

class DtoCategory {

    createCategoryDto(category: CategoryAttributes): CreateCategoryDto {

        return {
            id: category.id,
            name: category.name
        }
    }

    getDtoGetAllCategory(query: GetCategory): DtoCategoryGetAll {
        return {
            limit: query.limit || 5, 
            offset: query.offset || 0
        }
    }
}

export default new DtoCategory()