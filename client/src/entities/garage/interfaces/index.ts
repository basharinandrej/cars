

interface Car {
    vinCode: string
    brand: string
    model: string
    year: string
    color: string
    userId: number
}
export interface CarResponse {
    total: number
    items: Car[]
}