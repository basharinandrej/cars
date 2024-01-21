import {CreateBrandDto, GetBrandsDto, GetOneBrandDto} from "./types"
import { BrandAttributes } from "@models/brand/types"
import { GetBrands, GetOneBrand} from '@routers/router-brand/types'


class DtoDetail {

    createBrandDto(brand: BrandAttributes): CreateBrandDto {
        return {
            name: brand.name,
        }
    }

    getBrandDto(query: GetBrands): GetBrandsDto {
        return {
            limit: query.limit || 10,
            offset: query.offset || 0,
            order: query.order,
            sort: query.sort
        }
    }

    getOneBrandDto(query: GetOneBrand): GetOneBrandDto {
        return {
            id: query.id
        }
    }
}

export default new DtoDetail()