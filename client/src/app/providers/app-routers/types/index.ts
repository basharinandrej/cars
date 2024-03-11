import { UserRoles } from '@shared'
import {RouteProps} from 'react-router-dom'

export const enum Routes {
    Home = 'Home',
    Organization = 'Organization',
    DetailPage = 'DetailPage',
    OrganizationPage = 'OrganizationPage',
    LoginPage = 'LoginPage',
    LoginOrganization = 'LoginOrganization',
    ProfilePage = 'ProfilePage',
    GaragePage = 'GaragePage',
    UsersPage = 'UsersPage',
    CategoryDetailPage = 'CategoryDetailPage',
    CategoryServicePage = 'CategoryServicePage',
    Brands = 'Brands',
    MyDetails = 'MyDetails',
    MyRequest = 'MyRequest',

    // last
    NotFoundPage = 'NotFoundPage',
}

export type AppRouteProps =  RouteProps & {
    onlyAuth: boolean
    permissionForUserRole?: UserRoles[]
}