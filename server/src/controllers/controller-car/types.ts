import {Pagination} from '@common/types'


export interface ParamsGetAllCars extends Pagination {}

export interface ParamsGetOneCar {
    vinCode: string
}
