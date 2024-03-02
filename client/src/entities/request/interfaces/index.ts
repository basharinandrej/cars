import {StatusRequest,UserRoles } from '@shared'

export interface IRequest {
    id: number,
    recipientId: number,
    senderId: number,
    description: string,
    status: StatusRequest,
    serviceId: null,
    organizaiton: Organization
    user: User
}

interface Organization {
    id: number
    name: string
    email: string
}

interface User {
    id: number,
    name: string,
    surname: string
    email: string
    role: UserRoles
    phoneNumber: string
}

export interface RequestsResponse {
    count: number
    rows: IRequest[]
}