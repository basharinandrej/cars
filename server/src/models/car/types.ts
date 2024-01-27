import User from "@models/user"

export interface CarAttributes {
    vinCode: string
    brand: string
    model: string
    color: string
    year: number
    userId?: number

    User?: User
}

