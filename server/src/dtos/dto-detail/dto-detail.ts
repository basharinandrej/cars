import { DetailAttributes } from "@models/detail/types"
import {DtoDetailCreation, DtoDetailSearch} from "./types"
import {DetailSearch} from "@routers/router-detail/types"

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
            categoryId: detail.categoryId
        }
    }

    getDtoDetailSearch(query: DetailSearch): DtoDetailSearch {
        return {
            keyword: query.keyword
        }
    }
}

export default new DtoDetail()