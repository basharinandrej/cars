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

            return {
                refreshToken, 
                organization
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceOrganization.registrationOrganization'))
            }
        }
    }

    async login(dtoOrganizationLogin: DtoOrganizationLogin, next: NextFunction) {
        try {
            const canditate = await Organization.findOne({
                where: {email: dtoOrganizationLogin.email},
                attributes: ['id', 'name', 'email', 'phoneNumber', 'status', 'avatar' ]
            })

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

                return {
                    refreshToken,
                    organization: canditate
                }
            } else {
                next(ApiError.bedRequest(errorStrings.errorPassword()))
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceOrganization.login'))
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
                        where: paramsServiceCategory,
                        attributes: ['id', 'name']
                    },
                    {
                        model: Address,
                        attributes: ['id', 'city', 'street', 'house'],
                    }
                ]
            })

            return organizations

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceOrganization.getAllOrganizations'))
            }
        }
    }

    async initOrganization(dtoUserInit:DtoInitOrganization,next: NextFunction) {
        try {
            const organization = await Organization.findOne({
                where: {id: dtoUserInit.id}
            })
            if(!organization) {
                return next(ApiError.bedRequest(errorStrings.notFoundUser(dtoUserInit.id.toString())))
            }

            const {refreshToken} = serviceToken.generateTokens({
                id: organization.dataValues.id,
                name: organization.dataValues.name,
                isOrganization: true
            })
            return {
                refreshToken,
                organization
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceOrganization.initOrganization'))
            }
        }
    }

    async getByIdOrganization(dtoOrganizationGetOne: DtoOrganizationGetOne, next: NextFunction) {
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

            return organization
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceOrganization.getByIdOrganization'))
            }
        }
    }
}

export default new ServiceOrganization()