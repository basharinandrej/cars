import { NextFunction, Response } from 'express'
import {ParamsOrganizationGetAll, ParamsOrganizationGetById} from '@controllers/controller-organization/types'
import ApiError from '@api-error/index'
import { RequestCreation, RequestGetAll, RequestGetOne } from '@common/types'
import dtoOrganization from '@dtos/dto-organization/dto-organization'
import dtoAddress from '@dtos/dto-address/dto-address'
import {TIME_TO_LIFE_OF_TOKEN} from '@common/constans'
import {OrganizationChangePasswordParams, OrganizationRequestParams} from '@common/interfaces'
import serviceOrganization from '@services/service-organization'
import serviceAddress from '@services/service-address'
import { errorStrings } from '@common/error-strings'
import {v4} from 'uuid'
import path from 'path'


class ControllerOrganization {
    async registrationOrganization(req: RequestCreation<OrganizationRequestParams>, res: Response, next: NextFunction) {
        try {
            const avatar = req.files?.avatar

            if(Array.isArray(avatar) || !avatar) {
                return next(ApiError.bedRequest(errorStrings.onlyOnePhoto))
            }

            const fileName = v4() + '.jpg'
            avatar.mv(path.resolve(__dirname, '../..', 'static', fileName))
            
            const dtoOrganizationRegistration = dtoOrganization.getDtoOrganizationRegistration(req.body, fileName)
            const result = await serviceOrganization.registrationOrganization(dtoOrganizationRegistration, next)

            if(result) {
                const {refreshToken, organization} = result
                
                const dtoAddressCreation = dtoAddress.getDtoAddressCreation(req.body, organization.dataValues.id)
                const address = await serviceAddress.createAddress(dtoAddressCreation, next)

                // отправка картинки на Яндекс диск
                res.cookie('refreshToken', refreshToken, {maxAge: TIME_TO_LIFE_OF_TOKEN,  httpOnly: true})
                if(organization) {
                    res.status(201).send({organization, address})
                }
            } else {
                throw Error(errorStrings.notBeEmptyVariable('result'))
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerOrganization.registrationOrganization'))
            }
        }
    }

    async login(req: RequestCreation<OrganizationRequestParams>, res: Response, next: NextFunction) {
        try {
            const dtoOrganizationLogin = dtoOrganization.getDtoOrganizationLogin(req.body)
            const result = await serviceOrganization.login(dtoOrganizationLogin, next)

            if(result) {
                const {refreshToken, organization} = result
                res.cookie('refreshToken', refreshToken, {maxAge: TIME_TO_LIFE_OF_TOKEN,  httpOnly: true})
                res.send({organization})
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerOrganization.login'))
            }
        }
    }

    async getAllOrganization(req: RequestGetAll<ParamsOrganizationGetAll>, res: Response, next: NextFunction) {
        try {
            const dtoOrganizationGetAll = dtoOrganization.getDtoOrganizationGetAll(req.query)
            const organizations = await serviceOrganization.getAllOrganizations(dtoOrganizationGetAll, next)

            if(organizations) {
                res.send(organizations)
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerOrganization.getAllOrganization'))
            }
        }
    }

    async initOrganization(req: RequestGetOne<void>, res: Response, next: NextFunction) {
        try{
            const dtoUserInit = dtoOrganization.getDtoInitOrganization(req.cookies)
            const result = await serviceOrganization.initOrganization(dtoUserInit, next)

            if(result) {
                const {organization, refreshToken} = result

                res.cookie('refreshToken', refreshToken, {maxAge:TIME_TO_LIFE_OF_TOKEN,  httpOnly: true})
                res.status(200).send({organization})
            }
        } catch(err) {
            if(err instanceof Error) {
                next(ApiError.internal(err.message, 'ControllerOrganization.initOrganization'))
            }
        }
    }

    async getByIdOrganization(req: RequestGetOne<ParamsOrganizationGetById>, res: Response, next: NextFunction) {
        try {
            const dtoOrganizationGetOne = dtoOrganization.getDtoOrganizationGetOne(req.query)
            const organization = await serviceOrganization.getByIdOrganization(dtoOrganizationGetOne, next)
       
            if(organization) {
                res.status(200).send(organization)
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerOrganization.getByIdOrganization'))
            }
        }
    }

    async changePassword(req: RequestCreation<OrganizationChangePasswordParams>, res: Response, next: NextFunction) {
        try {
            const dtoOrganizationChangePassword = dtoOrganization.getDtoChangePassword(req.body, req.cookies)
            const result = await serviceOrganization.changePassword(dtoOrganizationChangePassword, next)

            if(result) {
                res.status(200).send(result)
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ControllerOrganization.changePassword'))
            }
        }
    }
}

export default new ControllerOrganization()