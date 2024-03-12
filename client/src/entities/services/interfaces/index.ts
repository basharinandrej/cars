

export interface IService {
    id: number
    description: string 
    name: string
    price: number
}

export interface ServicesResponse {
    rows: IService[]
    count: number
}