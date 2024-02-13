import Address from "@models/address"
import { NextFunction } from "express"
import ApiError from "@api-error/index";
import {DtoAddressCreation} from '@dtos/dto-address/types'



class ServiceAddress {
    async createAddress(dtoAddressCreation: DtoAddressCreation, next: NextFunction) {

       try {
            const data: DtoAddressCreation = {
                city: dtoAddressCreation.city,
                street: dtoAddressCreation.street,
                house: dtoAddressCreation.house
            }
            if(dtoAddressCreation.organizationId) {
                data.organizationId = dtoAddressCreation.organizationId
            }
            return await Address.create(data)
       } catch (error) {
        if(error instanceof Error) {
            next(ApiError.bedRequest(error))
        }
       }
    }
}

export default new ServiceAddress()