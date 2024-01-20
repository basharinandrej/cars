import { CreatePartsOfCarDto } from "@common/dtos";
import { PartsOfCarAttributes } from "@models/parts-of-car/types";



class DtoPartsOfCar {
    createPartsOfCar(partsOfCar: PartsOfCarAttributes): CreatePartsOfCarDto {

        return {
            name: partsOfCar.name,
            typeCarId: partsOfCar.typeCarId
        }
    }
}

export default new DtoPartsOfCar()