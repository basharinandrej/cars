import {TypeDetailAttributes} from "@models/type-detail/types";
import {CreateTypeDetailDto} from '@common/dtos'

class DtoTypeDetail {
    createTypeDetailDto(typeDetail: TypeDetailAttributes):CreateTypeDetailDto {
        return {
            name: typeDetail.name,
            partsOfCarId: typeDetail.partsOfCarId
        }
    }
}

export default new DtoTypeDetail()