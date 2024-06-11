import {NextFunction} from 'express'
import {DtoRequestCreation, DtoRequestUpdation, DtoRequestsGetAll, DtoRequestGetOne} from '@dtos/dto-request/types'
import Request from '@models/request'
import ApiError from '@api-error/index'
import User from '@models/user'
import Service from '@models/organization-service-category'
import Organization from '@models/organization'
import {mapperRequestGetById} from './mappers-request/mapper-request-get-by-id'
import { RequestAttributes } from '@models/request/types'



class ServiceRequest {
    async createRequest(dtoRequestCreation: DtoRequestCreation, next: NextFunction) {

        try {
            const request = await Request.create({
                description: dtoRequestCreation.description,
                senderId: dtoRequestCreation.senderId,
                recipientId: dtoRequestCreation.recipienId,
                serviceId: dtoRequestCreation.serviceId,
                status: dtoRequestCreation.status
            })

            return request
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceRequest.createRequest'))
            }
        }
    }

    async getAllRequests({limit, offset, senderId, recipientId }: DtoRequestsGetAll, next: NextFunction) {

        try {
            const params: Partial<RequestAttributes> = {}

            if(recipientId) params.recipientId=recipientId
            if(senderId) params.senderId=senderId

            const requests = await Request.findAndCountAll({
                limit, offset, where:params,
                attributes: [
                    'id', 'recipientId', 'senderId', 'description', 'status',  'serviceId'
                ],
                include: [
                    {
                        model: Organization,
                        as: 'organizaiton',
                        attributes: ['id', 'name', 'email']
                    },
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name', 'surname', 'email', 'role', 'phoneNumber']
                    }
                ],
            })

        
            return requests
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceRequest.getAllRequests'))
            }
        }

    }

    async getByIdRequest(dtoRequestGetOne: DtoRequestGetOne, next: NextFunction) {

        try {
            const request = await Request.findOne({
                where: {id: dtoRequestGetOne.id},
                include: [Service, Organization, User]
            })

            return request ? mapperRequestGetById(request) : null
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceRequest.getByIdRequest'))
            }
        }
    }


    async updateRequest(dtoRequestUpdation: DtoRequestUpdation, next: NextFunction) {

        try {
            const result = await Request.update({
                id: dtoRequestUpdation.id,
                description: dtoRequestUpdation.description,
                status: dtoRequestUpdation.status
            }, {where: {id: dtoRequestUpdation.id}})

            return result ? 'updated' : false
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message, 'ServiceRequest.updateRequest'))
            }
        }
    }
}


export default new ServiceRequest()