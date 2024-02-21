import {Routes, AppRouteProps} from '../types'
import {
    PageDetail, 
    PageListingDetails, 
    Page404,
    PageListingOrganizations,
    PageOrganization,
    PageLogin,
    PageCabinet,
    PageGarage
} from '@pages'


//todo вынести в shared
export const RoutePaths:Record<Routes,string> = {

    [Routes.Home]: '/',
    [Routes.Organization]: '/organizations',
    [Routes.DetailPage]: '/detail/', // :id
    [Routes.OrganizationPage]: '/organization/', // :id
    [Routes.LoginPage]: '/login/',
    [Routes.ProfilePage]: '/cabinet/profile/', // :id
    [Routes.GaragePage]: '/cabinet/garage/', // :id

    [Routes.NotFoundPage]: '*'
}

export const mapRoutes: Record<Routes, AppRouteProps> = {
    [Routes.Home]: {
        path: RoutePaths.Home,
        element: <PageListingDetails />,
        onlyAuth: false
    },

    [Routes.DetailPage]: {
        path: `${RoutePaths.DetailPage}:id`,
        element: <PageDetail/>,
        onlyAuth: false
    },

    [Routes.Organization]: {
        path: `${RoutePaths.Organization}`,
        element: <PageListingOrganizations />,
        onlyAuth: false
    },

    [Routes.OrganizationPage]: {
        path: `${RoutePaths.OrganizationPage}:id`,
        element: <PageOrganization />,
        onlyAuth: false
    },

    [Routes.LoginPage]: {
        path: RoutePaths.LoginPage,
        element: <PageLogin />,
        onlyAuth: false
    },

    [Routes.ProfilePage]: {
        path: `${RoutePaths.ProfilePage}:id`,
        element: <PageCabinet />,
        onlyAuth: true
    },

    [Routes.GaragePage]: {
        path: `${RoutePaths.GaragePage}:id`,
        element: <PageGarage />,
        onlyAuth: true
    },

    /*not found page - всегда последний в мапе*/
    [Routes.NotFoundPage]: {
        path: RoutePaths.NotFoundPage,
        element: <Page404 />,
        onlyAuth: false
    }
}