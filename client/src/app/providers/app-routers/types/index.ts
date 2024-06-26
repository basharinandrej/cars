import { UserRoles } from '@shared'
import {RouteProps} from 'react-router-dom'

export const enum Routes {
    Home = 'Home',
    Organization = 'Organization',
    DetailPage = 'DetailPage',
    OrganizationPage = 'OrganizationPage',
    LoginPage = 'LoginPage',
    LoginOrganization = 'LoginOrganization',
    RegistrationPage = 'RegistrationPage',
    PageRegistrationOrganization = 'PageRegistrationOrganization',
    ProfilePage = 'ProfilePage',
    GaragePage = 'GaragePage',
    UsersPage = 'UsersPage',
    AllOrganizationsPage = 'AllOrganizationsPage',
    CategoryDetailPage = 'CategoryDetailPage',
    CategoryServicePage = 'CategoryServicePage',
    Brands = 'Brands',
    Models = 'Models',
    MyDetails = 'MyDetails',
    MyRequest = 'MyRequest',
    MyServices = 'MyServices',

    // last
    NotFoundPage = 'NotFoundPage',
}

export type AppRouteProps =  RouteProps & {
    onlyAuth: boolean
    permissionForUserRole?: UserRoles[]
    onlyOrganization?: boolean
}