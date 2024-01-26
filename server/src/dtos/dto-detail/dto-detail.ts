import { DetailAttributes } from "@models/detail/types"
import {DtoDetailCreation, DtoDetailSearch, DtoDetailGetById, DtoDetailGetAll} from "./types"
import {ParamsGetAllDetails, ParamsSearchDetails, ParamsGetOneDetail} from "@controllers/controller-detail/types"
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
            modelId: detail.modelId,
            detailCategoryId: detail.detailCategoryId,
        }
    }

    getDtoDetailsGetAll(query: ParamsGetAllDetails): DtoDetailGetAll {

        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET,
            detailCategoryId: query.detailCategoryId,
            modelId: query.modelId
        }
    }

    getDtoDetailSearch(query: ParamsSearchDetails): DtoDetailSearch {
        return {
            keyword: query.keyword,
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET,
            detailCategoryId: query.detailCategoryId,
            modelId: query.modelId
        }
    }


    getDtoDetailGetById(query: ParamsGetOneDetail): DtoDetailGetById {
        return {
            id: query.id
        }
    }
}

export default new DtoDetail()