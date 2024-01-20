import {TypeCarAttributes} from "@models/type-car/types";
import {CreateTypeCarDto} from '@common/dtos'

class DtoTypeCar {
    createTypeCarDto(typeCar: TypeCarAttributes):CreateTypeCarDto {
        return {
            name: typeCar.name
        }
    }
}

export default new DtoTypeCar()