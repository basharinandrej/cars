import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from "@common/constans"
import { BrandAttributes } from "@models/brand/types"
import { ParamsGetAllBrands, ParamsGetOneBrand} from '@controllerscontroller-brand/types'
import {DtoBrandCreation, DtoBrandUpdation, DtoBrandGetById, DtoBrandsGetAll} from "./types"


class DtoDetail {
    getDtoBrandCreation(brand: BrandAttributes): DtoBrandCreation {
        return {
            name: brand.name,
        }
    }

    getDtoBrandsGetAll(query: ParamsGetAllBrands): DtoBrandsGetAll {
        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET,
            keyword: query.keyword,
            orderBy: query.orderBy,
            sortBy: query.sortBy
        }
    }

    getDtoBrandGetById(query: ParamsGetOneBrand): DtoBrandGetById {
        return {
            id: query.id
        }
    }

    getDtoBrandUpdation(brand: BrandAttributes): DtoBrandUpdation {
        return {
            id: brand.id,
            name: brand.name,
        }
    }
}

export default new DtoDetail()