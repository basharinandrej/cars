import {RouteProps} from 'react-router-dom'

export const enum Routes {
    Home = 'Home',
    Organization = 'Organization',
    DetailPage = 'DetailPage',
    OrganizationPage = 'OrganizationPage',
    LoginPage = 'LoginPage',
    CabinetPage = 'CabinetPage',

    // last
    NotFoundPage = 'NotFoundPage',
}

export type AppRouteProps =  RouteProps & {
    onlyAuth: boolean
}