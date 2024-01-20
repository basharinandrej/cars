import { DetailAttributes } from "@models/detail/types"
import {CreateDetailDto} from "@common/dtos"

class DtoDetail {


    createDetailDto(detail: DetailAttributes): CreateDetailDto {

        return {
            name: detail.name,
            vendorCode: detail.vendorCode,
            wear: detail.wear,
            year: detail.year,
            description: detail.name,
            price: detail.price,
            photos: detail.photos,
            state: detail.state,
            typeDetailId: detail.typeDetailId
        }
    }
}

export default new DtoDetail()