import {RouteProps} from 'react-router-dom'
import {Routes} from '../types'
import {
    PageDetail, 
    PageListingDetails, 
    Page404,
    PageListingOrganizations
} from '@pages'


//todo вынести в shared
export const RoutePaths:Record<Routes,string> = {

    [Routes.Home]: '/',
    [Routes.Organization]: '/organizations',
    [Routes.DetailPage]: '/detail/', // :vandorCode
    [Routes.NotFoundPage]: '*'
}

export const mapRoutes: Record<Routes, RouteProps> = {
    [Routes.Home]: {
        path: RoutePaths.Home,
        element: <PageListingDetails />,
    },

    [Routes.DetailPage]: {
        path: `${RoutePaths.DetailPage}:id`,
        element: <PageDetail/>
    },

    [Routes.Organization]: {
        path: `${RoutePaths.Organization}`,
        element: <PageListingOrganizations />
    },

    /*not found page - всегда последний в мапе*/
    [Routes.NotFoundPage]: {
        path: RoutePaths.NotFoundPage,
        element: <Page404 />
    }
}