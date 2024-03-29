import { CarAttributes } from "@models/car/types";
import {DtoCarCreation, DtoCarUpdation, DtoCarGetAll, DtoCarGetByVinCode} from './types'
import {ParamsGetAllCars, ParamsGetOneCar} from '@controllers/controller-car/types'
import {serviceToken} from '@services/service-token'
import {Cookies} from '@common/interfaces'


class DtoCar {

    getDtoCarCreation(car: CarAttributes, cookies: Cookies): DtoCarCreation {
        const token = cookies.refreshToken
        const {id: userId} = serviceToken.validationToken(token)

    
        return {
            vinCode: car.vinCode,
            brand: car.brand,
            model: car.model,
            year: car.year,
            color: car.color,
            userId
        }
    }

    getDtoCarUpdation(car: CarAttributes): DtoCarUpdation {
        return {
            vinCode: car.vinCode,
            brand: car.brand,
            model: car.model,
            year: car.year,
            color: car.color
        }
    }

    getDtoGetAllCars(query: ParamsGetAllCars): DtoCarGetAll {
        return {
            limit: query.limit,
            offset: query.offset,
            userId: query.userId
        }
    }

    getDtoCarByVinCode(query: ParamsGetOneCar): DtoCarGetByVinCode  {
        return {
            vinCode: query.vinCode
        }
    }
}

export default new DtoCar()