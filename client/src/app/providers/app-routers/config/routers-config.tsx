import {RouteProps} from 'react-router-dom'
import {Routes} from '../types'
import {DetailPage, ListingDetailsPage} from '@pages'


//todo вынести в shared
export const RoutePaths:Record<Routes,string> = {

    [Routes.Home]: '/',
    [Routes.DetailPage]: '/detail/', // :vandorCode
    [Routes.NotFoundPage]: '*'
}

export const mapRoutes: Record<Routes, RouteProps> = {
    [Routes.Home]: {
        path: RoutePaths.Home,
        element: <ListingDetailsPage />,
    },

    [Routes.DetailPage]: {
        path: `${RoutePaths.DetailPage}:vendorCode`,
        element: <DetailPage/>
    },

    /*not found page - всегда последний в мапе*/
    [Routes.NotFoundPage]: {
        path: RoutePaths.NotFoundPage,
        // element: <Page404 />,
        // onlyAuth: false
    }
}