import {Pagination} from '@common/types'


export interface ParamsGetAllCars extends Pagination {}

export interface ParamsGetOneCar {
    vinCode: string
}
export interface ParamsDeleteCar {
    vinCode: string
}