import {Pagination} from '@common/types'


export interface ParamsGetAllCars extends Pagination {
    userId: number
}

export interface ParamsGetOneCar {
    vinCode: string
}
export interface ParamsDeleteCar {
    vinCode: string
}