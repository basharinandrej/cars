import { NextFunction } from "express"
import ApiError from '@api-error/index'
import {
    DtoOrganizationGetAll,
    DtoOrganizationGetOne, 
    DtoOrganizationRegistration,
    DtoOrganizationLogin,
    DtoInitOrganization
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
import ServiceCategory from '@models/service-category'

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

            const {refreshToken} = serviceToken.generateTokens({
                id: organization.dataValues.id,
                name: organization.dataValues.name,
                isOrganization: true
            })

            await serviceToken.saveTokenOrganization(refreshToken, organization.dataValues.id)

            return {
                refreshToken, 
                organization: mapperOrganizationCreation(organization)
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
                const {refreshToken} = serviceToken.generateTokens({
                    id: canditate.dataValues.id,
                    name: canditate.dataValues.name,
                    isOrganization: true
                })
                await serviceToken.saveTokenOrganization(refreshToken, canditate.dataValues.id)

                return {
                    refreshToken,
                    organization: canditate
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

    async getAllOrganizations({ limit, offset, status, serviceCategoryId}: DtoOrganizationGetAll, next: NextFunction) {

        try {
            const params: Partial<DtoOrganizationGetAll> = {}

            if(status) params.status = status

            const paramsServiceCategory: Partial<{id: number}> = {}
            if(serviceCategoryId) paramsServiceCategory.id = serviceCategoryId

            const organizations = await Organization.findAndCountAll({
                limit,
                offset,
                where: params,
                include: [
                    {
                        model: ServiceCategory,
                        as: "serviceCategories",
                        where: paramsServiceCategory
                    },
                    {
                        model: Address
                    }
                ]
            })

            return mapperOrganizationsGetAll(organizations)

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async initOrganization(dtoUserInit:DtoInitOrganization,next: NextFunction) {
        try {
            if(dtoUserInit.id) {
                const organization = await Organization.findOne({
                    where: {id: dtoUserInit.id}
                })
                const {refreshToken} = serviceToken.generateTokens({
                    id: organization.dataValues.id,
                    name: organization.dataValues.name,
                    isOrganization: true
                })
                return {
                    refreshToken,
                    organization
                }
            }
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
                attributes: ['id', 'name', 'email', 'avatar', 'phoneNumber',  'ban',  'status'],
                include: [
                    {
                        model: ServiceCategory,
                        as: "serviceCategories",
                        attributes: ['id', 'name']
                    },
                    {
                        model: Address,
                        attributes: ['id', 'city', 'street', 'house'],
                    }
                ] 
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