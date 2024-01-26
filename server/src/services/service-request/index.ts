import {NextFunction} from 'express'
import {DtoRequestCreation, DtoRequestsGetAll} from '@dtos/dto-request/types'
import Request from '@models/request'
import ApiError from '@api-error/index'
import User from '@models/user'


class ServiceRequest {
    async createRequest(dtoRequestCreation: DtoRequestCreation, next: NextFunction) {

        try {
            const request = await Request.create({
                description: dtoRequestCreation.description,
                senderId: dtoRequestCreation.senderId,
                recipientId: dtoRequestCreation.recipienId,
                serviceId: dtoRequestCreation.serviceId
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

    async getByIdRequest() {

    }
}


export default new ServiceRequest()