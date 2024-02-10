import {RouteProps} from 'react-router-dom'
import {Routes} from '../types'
import {DetailPage, ListingDetailsPage, Page404, ListingOrganizationPage} from '@pages'


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
        element: <ListingDetailsPage />,
    },

    [Routes.DetailPage]: {
        path: `${RoutePaths.DetailPage}:id`,
        element: <DetailPage/>
    },

    [Routes.Organization]: {
        path: `${RoutePaths.Organization}`,
        element: <ListingOrganizationPage/>
    },

    /*not found page - всегда последний в мапе*/
    [Routes.NotFoundPage]: {
        path: RoutePaths.NotFoundPage,
        element: <Page404 />
    }
}