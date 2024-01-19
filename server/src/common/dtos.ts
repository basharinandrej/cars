import { State, UserRoles } from "@common/enums"

export interface CreateBrandDto {
    name: string
}

export interface GetBrandsDto {
    limit: number
    offset: number
}

export interface CreateModelDto {
    name: string
    brandId: number
    typeCarId: number
}

export interface GetModelsDto {
    limit: number
    offset: number
}

export interface CreateTypeCarDto {
    name: string
}

export interface GetTypesCarDto {
    limit: number
    offset: number
}

export interface CreateDetailDto {
    name: string
    vendorCode: number
    wear: number
    year: number
    description: string
    price: number
    photos: number
    state: State
    typeDetailId: number
}

export interface GetDetailsDto {
    limit: number
    offset: number
}

export interface CreatePartsOfCarDto {
    name: string,
    typeCarId: number
}

export interface GetPartsOfCarsDto {
    limit: number
    offset: number
}

export interface CreateTypeDetailDto {
    name: string,
    partsOfCarId: number
}

export interface GetTypeDetailsDto {
    limit: number, 
    offset: number 
}

export interface RegistrationUserDto {
    id: number
    name: string
    surname: string
    email: string
    role: UserRoles
    phoneNumber: number
    password: string
    balance?: number
    banType?: number
    avatar?: string
    addres?: number
}

export interface LoginUserDto {
    email: string
    password: string
}


export interface GetAllUserDto {
    limit: number, 
    offset: number 
}
