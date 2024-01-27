import { CarAttributes } from "@models/car/types";
import {DtoCarCreation, DtoCarGetAll, DtoCarGetByVinCode} from './types'
import {ParamsGetAllCars, ParamsGetOneCar} from '@controllers/controller-car/types'
import {extractAccessToken} from '@common/utils/extract-tokens'
import {serviceToken} from '@services/service-token'


class DtoCar {

    getDtoCarCreation(car: CarAttributes, authorization: string): DtoCarCreation {
        const token = extractAccessToken(authorization)
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

    getDtoGetAllCars(query: ParamsGetAllCars): DtoCarGetAll {
        return {
            limit: query.limit,
            offset: query.offset
        }
    }

    getDtoCarByVinCode(query: ParamsGetOneCar): DtoCarGetByVinCode  {
        return {
            vinCode: query.vinCode
        }
    }
}

export default new DtoCar()