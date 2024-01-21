import { DetailAttributes } from "@models/detail/types"
import {DtoDetailCreation, DtoDetailSearch, DtoDetailGetAll} from "./types"
import {DetailSearch, GetDetails} from "@routers/router-detail/types"
import {
    PAGINATION_DEFAULT_LIMIT,
    PAGINATION_DEFAULT_OFFSET
} from '@common/constans/index'

class DtoDetail {
    getDtoDetailCreation(detail: DetailAttributes): DtoDetailCreation {

        return {
            name: detail.name,
            vendorCode: detail.vendorCode,
            wear: detail.wear,
            year: detail.year,
            description: detail.name,
            price: detail.price,
            photos: detail.photos,
            state: detail.state,
            modelId: detail.modelId,
            categoryId: detail.categoryId,
            wearId: detail.wearId
        }
    }

    getDtoDetailsGetAll(query: GetDetails): DtoDetailGetAll {

        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET,
            categoryId: query.categoryId,
            modelId: query.modelId
        }
    }

    getDtoDetailSearch(query: DetailSearch): DtoDetailSearch {
        return {
            keyword: query.keyword,
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET,
            categoryId: query.categoryId,
            modelId: query.modelId
        }
    }
}

export default new DtoDetail()