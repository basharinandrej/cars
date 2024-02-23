import { DetailAttributes } from "@models/detail/types"
import {DtoDetailCreation, DtoDetailGetById, DtoDetailGetAll} from "./types"
import {ParamsGetAllDetails, ParamsGetOneDetail} from "@controllers/controller-detail/types"
import {
    PAGINATION_DEFAULT_LIMIT,
    PAGINATION_DEFAULT_OFFSET
} from '@common/constans/index'
import {Cookies} from '@common/interfaces'
import {serviceToken} from '@services/service-token'

class DtoDetail {
    getDtoDetailCreation(detail: DetailAttributes, cookies: Cookies): DtoDetailCreation {
        const token = cookies.refreshToken
        const {id: userId} = serviceToken.validationToken(token)

        return {
            name: detail.name,
            vendorCode: detail.vendorCode,
            wear: detail.wear,
            year: detail.year,
            description: detail.description,
            price: detail.price,
            modelId: detail.modelId,
            detailCategoryId: detail.detailCategoryId,
            userId,
        }
    }

    getDtoDetailsGetAll(query: ParamsGetAllDetails): DtoDetailGetAll {

        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET,
            detailCategoryId: query.detailCategoryId,
            modelId: query.modelId,
            keyword: query.keyword,
            userId: query.userId
        }
    }

    getDtoDetailGetById(query: ParamsGetOneDetail): DtoDetailGetById {
        return {
            id: query.id
        }
    }
}

export default new DtoDetail()