import Service from "@models/organization-service-category"
import Organization from "@models/organization"
import User from "@models/user"
import { Optional } from "sequelize"

export const enum StatusRequest {
    APPROVED = 'Approved',
    DECLINED = 'Declined',
    IN_VIEWING = 'In_Viewing',
    FINISHED = 'Finished'
}

export interface RequestAttributes {
    id: number

    status: StatusRequest
    senderId: number
    recipientId: number
    description: string
    serviceId?: number

    Service?: Service
    Organization?: Organization
    User?: User
}

export interface CreationRequest extends Optional<RequestAttributes, 'id'> {}