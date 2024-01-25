

export interface DtoRequestCreation {
    description: string
    senderId: number
    recipienId: number
    serviceId: number
}

export interface DtoRequestsGetAll {
    limit: number
    offset: number
}
