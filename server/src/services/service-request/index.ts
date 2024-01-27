import {NextFunction} from 'express'
import {DtoRequestCreation, DtoRequestsGetAll, DtoRequestGetOne} from '@dtos/dto-request/types'
import Request from '@models/request'
import ApiError from '@api-error/index'
import User from '@models/user'
import Service from '@models/service'
import Organization from '@models/organization'
import {mapperRequestGetById} from './mappers-request/mapper-request-get-by-id'



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
                next(ApiError.internal(error.message))
            }
        }
    }


    async getAllRequests({limit, offset}: DtoRequestsGetAll, next: NextFunction) {

        try {
            const requests = await Request.findAndCountAll({
                limit, offset, include: [User]
            })

            const oneRequest = requests.rows[0]

            const sender = await User.findOne({
                where: {id: oneRequest.dataValues.senderId}
            })

            const recipient = await User.findOne({
                where: {id: oneRequest.dataValues.recipientId}
            })

            return {oneRequest, sender, recipient}
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }

    }

    async getByIdRequest(dtoRequestGetOne: DtoRequestGetOne, next: NextFunction) {

        try {
            const request = await Request.findOne({
                where: {id: dtoRequestGetOne.id},
                include: [Service, Organization, User]
            })

            return mapperRequestGetById(request)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}


export default new ServiceRequest()