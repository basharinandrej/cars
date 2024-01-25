import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from "@common/constans"
import { BrandAttributes } from "@models/brand/types"
import { ParamsGetAllBrands, ParamsGetOneBrand} from '@routers/router-brand/types'
import {DtoBrandCreation, DtoBrandGetById, DtoBrandGetAll} from "./types"


class DtoDetail {
    getDtoBrandCreation(brand: BrandAttributes): DtoBrandCreation {
        return {
            name: brand.name,
        }
    }

    getDtoBrandsGetAll(query: ParamsGetAllBrands): DtoBrandGetAll {
        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET,
            order: query.order,
            sort: query.sort
        }
    }

    getDtoBrandGetById(query: ParamsGetOneBrand): DtoBrandGetById {
        return {
            id: query.id
        }
    }
}

export default new DtoDetail()