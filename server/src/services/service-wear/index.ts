import ApiError from "@api-error/index"
import { DtoWearCreation, DtoWearGetAll, DtoWearGetById } from "@dtos/dto-wear/types"
import Wear from "@modelsdetail/detail-wear"
import { NextFunction } from "express"
import {mapperWearCreation} from './wear-mappers/mapper-wear-creation'
import {mapperWearGerAll} from './wear-mappers/mapper-wear-get-all'
import {mapperWearGetById} from './wear-mappers/mapper-wear-get-by-id'


class ServiceWear {
    async createWear({name, description}: DtoWearCreation, next: NextFunction) {
        try {
            const wear = await Wear.create({
                name, description
            })
            return mapperWearCreation(wear)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async getAllWear({limit, offset}: DtoWearGetAll, next: NextFunction) {
        try {
            const wears = await Wear.findAndCountAll({
                limit, offset
            })
            return mapperWearGerAll(wears)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async getByIdWear({id}: DtoWearGetById, next: NextFunction) {
        try {
            const wear = await Wear.create({
                id
            })
            return mapperWearGetById(wear)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }
}

export default new ServiceWear()