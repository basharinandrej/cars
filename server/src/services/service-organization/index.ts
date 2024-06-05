import { NextFunction } from "express"
import ApiError from '@api-error/index'
import {
    DtoOrganizationGetAll,
    DtoOrganizationGetOne, 
    DtoOrganizationRegistration,
    DtoOrganizationLogin,
    DtoInitOrganization,
    DtoOrganizationChangePassword
} from '@dtos/dto-organization/types'
import {errorStrings} from '@common/error-strings'
import {serviceToken} from '@services/service-token'
import {getHashPassword} from '@common/utils/get-hash-password'
import Organization from "@models/organization"
import {compareHashPassword} from '@common/utils/compare-hash-password'
import Address from "@models/address"
import ServiceCategory from '@models/service-category'
import type { Includeable } from "sequelize";


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
                attributes: ['id', 'name', 'email', 'phoneNumber', 'status', 'avatar', 'password' ]
            })

            if(!canditate) {
                return next(ApiError.bedRequest(errorStrings.notFoundOrganization(dtoOrganizationLogin.email)))
            } 

            const isMatchPasswords = await compareHashPassword(dtoOrganizationLogin.password, canditate.dataValues.password)

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
                next(ApiError.bedRequest(errorStrings.errorPasswordOrEmail()))
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


            const include: Includeable[] = [
                {
                    model: Address,
                    as: "addresses",
                    attributes: ['id', 'city', 'street', 'house'],
                }
            ]
            if(serviceCategoryId) {
                const paramsServiceCategory: Partial<{id: number}> = {id: serviceCategoryId}
                
                include.push({
                    model: ServiceCategory,
                    as: "serviceCategories",
                    where: paramsServiceCategory,
                    attributes: ['id', 'name']
                })
            }

            const organizations = await Organization.findAndCountAll({
                limit,
                offset,
                where: params,
                attributes: ['id', 'name', 'email', 'avatar', 'phoneNumber', 'ban', 'status'],
                include
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
                return next(ApiError.bedRequest(errorStrings.notFoundOrganization(dtoUserInit.id.toString())))
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
                        as: "addresses",
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

    async changePassword({organizationId, oldPassword, newPassword}: DtoOrganizationChangePassword, next: NextFunction) {
        try {
            const candidate = await Organization.findOne({
                where: {id: organizationId},
                attributes: ['id', 'password']
            })
            if(!candidate) {
                return next(ApiError.bedRequest(errorStrings.notFoundOrganization(organizationId.toString())))
            }

            const hashNewPassword = await getHashPassword(newPassword)
            const isMatchOldPasswords = await compareHashPassword(oldPassword, candidate.dataValues.password)
            
            if(isMatchOldPasswords) {
                const organization = await Organization.update(
                    {password: hashNewPassword},
                    {
                        where: {id: organizationId}
                    },
                )
                return organization
            } else {
                next(ApiError.bedRequest(errorStrings.errorPasswordOrEmail()))
            }

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceOrganization.changePassword'))
            }
        }
    }
}

export default new ServiceOrganization()