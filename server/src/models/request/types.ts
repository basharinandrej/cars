import { Optional } from "sequelize"

export interface RequestAttributes {
    id: number
    senderId: number
    recipientId: number
    description: string
    // serviceId: number
}

export interface CreationRequest extends Optional<RequestAttributes, 'id'> {}