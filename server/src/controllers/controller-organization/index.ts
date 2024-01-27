import { NextFunction, Response } from 'express'
import {ParamsOrganizationGetAll, ParamsOrganizationGetById} from '@controllers/controller-organization/types'
import ApiError from '@api-error/index'
import { RequestCreation, RequestGetAll, RequestGetOne } from '@common/types'
import dtoOrganization from '@dtos/dto-organization/dto-organization'
import {OrganizationRequestParams} from '@common/interfaces'
import serviceOrganization from '@services/service-organization'



class ControllerOrganization {
    async registrationOrganization(req: RequestCreation<OrganizationRequestParams>, res: Response, next: NextFunction) {
        try {
            const dtoOrganizationRegistration = dtoOrganization.getDtoOrganizationRegistration(req.body)
            const organization = await serviceOrganization.registrationOrganization(dtoOrganizationRegistration, next)

            if(organization) {
                res.send(organization)
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

    async getByIdOrganization(req: RequestGetOne<ParamsOrganizationGetById>, res: Response, next: NextFunction) {
        try {
            const dtoOrganizationGetOne = dtoOrganization.getDtoOrganizationGetOne(req.query)
            const organization = await serviceOrganization.getDtoOrganizationGetOne(dtoOrganizationGetOne, next)
       
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