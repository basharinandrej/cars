import { NextFunction, Response } from 'express'
import {ParamsOrganizationGetAll, ParamsOrganizationGetById} from '@controllers/controller-organization/types'
import ApiError from '@api-error/index'
import { RequestCreation, RequestGetAll, RequestGetOne } from '@common/types'
import { OrganizationAttributes } from '@modelsorganization/types'


class ControllerOrganization {
    async createOrganization(req: RequestCreation<OrganizationAttributes>, res: Response, next: NextFunction) {
        try {

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAllOrganization(req: RequestGetAll<ParamsOrganizationGetAll>, res: Response, next: NextFunction) {
        try {

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getByIdOrganization(req: RequestGetOne<ParamsOrganizationGetById>, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}

export default new ControllerOrganization()