import { CarAttributes } from "@models/car/types";
import {DtoCarCreation, DtoCarGetAll, DtoCarGetByVinCode} from './types'
import {ParamsGetAllCars, ParamsGetOneCar} from '@controllers/controller-car/types'


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

    getDtoGetAllCars(query: ParamsGetAllCars): DtoCarGetAll {
        return {
            limit: query.limit,
            offset: query.offset
        }
    }

    getDtoCarByVinCode(query: ParamsGetOneCar):DtoCarGetByVinCode  {
        return {
            vinCode: query.vinCode
        }
    }
}

export default new DtoCar()