

export interface IService {
    id: number
    description: string 
    name: string
    price: number
}

export interface IServiceRequest extends Omit<IService, 'id'> {
    serviceCategoryId: number,
    organizationId: number
}

export interface ServicesResponse {
    rows: IService[]
    count: number
}

export interface FormAddNewServiceValueTypes {
    name: string,
    description: string,
    price: number,
    serviceCategoryId: number,
    organizationId: number
}

export interface ServiceCategory {
    label: string,
    value: number
}
export interface ServiceCategoryResponse {
    total: number,
    items: ServiceCategory[]
}