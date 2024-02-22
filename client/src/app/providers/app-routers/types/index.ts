import { UserRoles } from '@shared'
import {RouteProps} from 'react-router-dom'

export const enum Routes {
    Home = 'Home',
    Organization = 'Organization',
    DetailPage = 'DetailPage',
    OrganizationPage = 'OrganizationPage',
    LoginPage = 'LoginPage',
    ProfilePage = 'ProfilePage',
    GaragePage = 'GaragePage',
    UsersPage = 'UsersPage',
    CategoryDetailPage = 'CategoryDetailPage',
    MyDetails = 'MyDetails',

    // last
    NotFoundPage = 'NotFoundPage',
}

export type AppRouteProps =  RouteProps & {
    onlyAuth: boolean
    userRole?: UserRoles
}