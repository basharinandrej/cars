import { Optional } from "sequelize"

export const enum StatusRequest {
    APPROVED = 'Approved',
    DECLINED = 'Declined',
    IN_VIEWING = 'In_Viewing'
}

export interface RequestAttributes {
    id: number

    status: StatusRequest
    senderId: number
    recipientId: number
    description: string
    serviceId?: number
}

export interface CreationRequest extends Optional<RequestAttributes, 'id'> {}