enum State {
    NEW,
    SECOND_HAND
}

export interface DetailAttributes {
    name: string
    vendorCode: number
    wear: number
    year: number
    description: string
    price: number
    photos: number
    state: State
    typeDetailId?: number
}

