import {
    ListingDetailsSchema, 
    FilterListingDetailsSchema, 
    DetailInformationSchema,
    ListingOrganizationSchema,
    FilterListingOrganizationsSchema,
    OrganizationInformationSchema,
    LoginUserSchema,
    AddNewCarSchema,
    AddNewDetailSchema,
    AddNewRequestSchema,
    LoginOrganizationSchema
} from '@features'
import {
    MenuSchema, 
    LogoSchema, 
    ProfileSchema,
    SidebarSchema,
    CarSchema,
    UsersSchema,
    RequestsSchema
} from '@entities'
import { AxiosInstance } from 'axios'
import {NotificationInstance} from 'antd/es/notification/interface'


export interface StateSchema {
    listingDetails: ListingDetailsSchema
    listingOrganization: ListingOrganizationSchema

    filterListingDetails: FilterListingDetailsSchema
    filterListingOrganization: FilterListingOrganizationsSchema

    detailInformation: DetailInformationSchema
    organizationInformation: OrganizationInformationSchema
    
    loginUser: LoginUserSchema,
    loginOrganization: LoginOrganizationSchema,
    profile: ProfileSchema,

    sidebar: SidebarSchema,
    menu: MenuSchema,
    logo: LogoSchema
    cars: CarSchema,
    addNewCar: AddNewCarSchema

    addNewDetail: AddNewDetailSchema
    users: UsersSchema
    addNewRequest: AddNewRequestSchema
    request: RequestsSchema
}

interface thunkMiddleware {
    api: AxiosInstance
    notificationApi: NotificationInstance
    getErrorMessage: (error: any) => string
}

export interface ThunkApiConfig {
    state: StateSchema,
    extra: thunkMiddleware
}
