import {RouteProps} from 'react-router-dom'

export const enum Routes {
    Home = 'Home',
    Organization = 'Organization',
    DetailPage = 'DetailPage',
    OrganizationPage = 'OrganizationPage',
    LoginPage = 'LoginPage',
    ProfilePage = 'ProfilePage',
    GaragePage = 'GaragePage',

    // last
    NotFoundPage = 'NotFoundPage',
}

export type AppRouteProps =  RouteProps & {
    onlyAuth: boolean
}