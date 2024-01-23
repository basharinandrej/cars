import { CarAttributes } from "@models/car/types";
import {DtoCarCreation, DtoCarGetAll, DtoCarGetByVinCode} from './types'
import {GetCars, GetByVINCodeCar} from '@routers/router-car/types'


class DtoCar {

    getDtoCarCreation(car: CarAttributes): DtoCarCreation {
        return {
            vinCode: car.vinCode,
            brand: car.brand,
            model: car.model,
            year: car.year,
            color: car.color,
        }
    }

    getDtoCars(query: GetCars): DtoCarGetAll {
        return {
            limit: query.limit,
            offset: query.offset
        }
    }

    getDtoCarByVinCode(query: GetByVINCodeCar):DtoCarGetByVinCode  {
        return {
            vinCode: query.vinCode
        }
    }
}

export default new DtoCar()