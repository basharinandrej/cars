import { NextFunction, Response } from 'express'
import {ParamsOrganizationGetAll, ParamsOrganizationGetById} from '@controllers/controller-organization/types'
import ApiError from '@api-error/index'
import { RequestCreation, RequestGetAll, RequestGetOne } from '@common/types'
import dtoOrganization from '@dtos/dto-organization/dto-organization'
import dtoAddress from '@dtos/dto-address/dto-address'
import {OrganizationRequestParams} from '@common/interfaces'
import serviceOrganization from '@services/service-organization'
import serviceAddress from '@services/service-address'
import { errorStrings } from '@common/error-strings'
import {v4} from 'uuid'
import path from 'path'


class ControllerOrganization {
    async registrationOrganization(req: RequestCreation<OrganizationRequestParams>, res: Response, next: NextFunction) {
        try {
            const avatar = req.files.avatar

            if(!Array.isArray(avatar)) {
                const fileName = v4() + '.jpg'
                avatar.mv(path.resolve(__dirname, '../..', 'static', fileName))
                
                const dtoOrganizationRegistration = dtoOrganization.getDtoOrganizationRegistration(req.body, fileName)
                const {refreshToken, organization} = await serviceOrganization.registrationOrganization(dtoOrganizationRegistration, next)
    
                const dtoAddressCreation = dtoAddress.getDtoAddressCreation(req.body, organization.id)
                const address = await serviceAddress.createAddress(dtoAddressCreation, next)

                // отправка картинки на Яндекс диск
                res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})
                if(organization) {
                    res.send({organization, address})
                }
            } else {
                next(ApiError.bedRequest(errorStrings.onlyOnePhoto))
            }
 
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async login(req: RequestCreation<OrganizationRequestParams>, res: Response, next: NextFunction) {
        try {
            const dtoOrganizationLogin = dtoOrganization.getDtoOrganizationLogin(req.body)
            const result = await serviceOrganization.login(dtoOrganizationLogin, next)

            if(result) {
                const {refreshToken, organization} = result
                res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})
                res.send({organization})
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
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
                next(ApiError.internal(error.message))
            }
        }
    }

    async initOrganization(req: RequestGetOne<void>, res: Response, next: NextFunction) {
        try{
            const dtoUserInit = dtoOrganization.getDtoInitOrganization(req.cookies)
            const {organization, refreshToken} = await serviceOrganization.initOrganization(dtoUserInit, next)
            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})

            res.send({organization})
        } catch(err) {
            if(err instanceof Error) {
                next(ApiError.bedRequest(err.message))
            }
        }
    }

    async getByIdOrganization(req: RequestGetOne<ParamsOrganizationGetById>, res: Response, next: NextFunction) {
        try {
            const dtoOrganizationGetOne = dtoOrganization.getDtoOrganizationGetOne(req.query)
            const organization = await serviceOrganization.getOrganizationGetOne(dtoOrganizationGetOne, next)
       
            if(organization) {
                res.send(organization)
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}

export default new ControllerOrganization()