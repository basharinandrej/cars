import { NextFunction } from "express"
import ApiError from '@api-error/index'
import {
    DtoOrganizationGetAll,
    DtoOrganizationGetOne, 
    DtoOrganizationRegistration,
    DtoOrganizationLogin
} from '@dtos/dto-organization/types'
import {errorStrings} from '@common/error-strings'
import {serviceToken} from '@services/service-token'
import {getHashPassword} from '@common/utils/get-hash-password'
import Organization from "@models/organization"
import {compareHashPassword} from '@common/utils/compare-hash-password'
import {mapperOrganizationCreation} from './mappers-organization/mapper-organization-creation'
import {mapperOrganizationsGetAll} from './mappers-organization/mapper-organizations-get-all'
import {mapperOrganizationGetOne} from './mappers-organization/mapper-organization-get-one'
import Address from "@models/address"
import Service from "@models/service"
import ServiceCategory from "@models/service/service-category"


class ServiceOrganization {
    async registrationOrganization(dtoOrganizationRegistration: DtoOrganizationRegistration, next: NextFunction) {
        try {
            const canditate = await Organization.findOne({where: {email: dtoOrganizationRegistration.email}})

            if(canditate) {
                next(ApiError.bedRequest(errorStrings.organizationAlreadyExist(canditate.dataValues.email)))
            }

            const hashPassword = await getHashPassword(dtoOrganizationRegistration.password)

            const organization = await Organization.create({
                name: dtoOrganizationRegistration.name.toLowerCase(),
                password: hashPassword,
                email: dtoOrganizationRegistration.email,
                phoneNumber: dtoOrganizationRegistration.phoneNumber,
                ban: dtoOrganizationRegistration.ban,
                status: dtoOrganizationRegistration.status,
                avatar: dtoOrganizationRegistration.avatar
            })
            //todo добавить почту

            const {accessToken, refreshToken} = serviceToken.generateTokens({
                id: organization.dataValues.id,
                name: organization.dataValues.name,
                isOrganization: true
            })

            await serviceToken.saveTokenOrganization(refreshToken, organization.dataValues.id)

            return {
                refreshToken, 
                organization: mapperOrganizationCreation(organization), 
                accessToken
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async login(dtoOrganizationLogin: DtoOrganizationLogin, next: NextFunction) {
        try {
            const canditate = await Organization.findOne({where: {email: dtoOrganizationLogin.email}})

            if(!canditate) {
                return next(ApiError.bedRequest(errorStrings.notFoundUser(dtoOrganizationLogin.email)))
            } 

            const hashPassword = await getHashPassword(dtoOrganizationLogin.password)
            const isMatchPasswords = await compareHashPassword(dtoOrganizationLogin.password, hashPassword)

            if(isMatchPasswords) {
                const {accessToken, refreshToken} = serviceToken.generateTokens({
                    id: canditate.dataValues.id,
                    name: canditate.dataValues.name,
                })
                await serviceToken.saveTokenOrganization(refreshToken, canditate.dataValues.id)

                return {
                    refreshToken,
                    user: canditate,
                    accessToken
                }
            } else {
                next(ApiError.bedRequest(errorStrings.errorPassword()))
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async getAllOrganizations({ limit, offset, status}: DtoOrganizationGetAll, next: NextFunction) {

        try {
            const params: Partial<DtoOrganizationGetAll> = {}

            if(status) params.status = status

            const organizations = await Organization.findAndCountAll({
                limit,
                offset,
                where: params,
                include: Address
            })
            return mapperOrganizationsGetAll(organizations)

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async getOrganizationGetOne(dtoOrganizationGetOne: DtoOrganizationGetOne, next: NextFunction) {
        try {
            const organization = await Organization.findOne({
                where: {id: dtoOrganizationGetOne.id},
                include: [Address, Service]
            })

            return mapperOrganizationGetOne(organization)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }
}

export default new ServiceOrganization()