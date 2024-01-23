export interface DtoCarCreation {
    vinCode: string,
    brand: string,
    model: string,
    year: number,
    color: string
}


export interface DtoCarGetAll {
    limit: number,
    offset: number
}

export interface DtoCarGetByVinCode {
    vinCode: string
}