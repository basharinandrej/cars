import {Routes, AppRouteProps} from '../types'
import {UserRoles} from '@shared'
import {
    PageDetail, 
    PageListingDetails, 
    Page404,
    PageListingOrganizations,
    PageOrganization,
    PageLogin,
    PageProfile,
    PageGarage,
    PageMyDetail,
    PageUsers,
    PageMyRequest,
    PageLoginOrganization,
    PageCategoryDetails,
    PageCategoryServices,
    PageBrands
} from '@pages'


//todo вынести в shared
export const RoutePaths:Record<Routes,string> = {

    [Routes.Home]: '/',
    [Routes.Organization]: '/organizations',
    [Routes.DetailPage]: '/detail/', // :id
    [Routes.OrganizationPage]: '/organization/', // :id
    [Routes.LoginPage]: '/login/user',
    [Routes.LoginOrganization]: '/login/organization',
    [Routes.ProfilePage]: '/cabinet/profile/', // :id
    [Routes.GaragePage]: '/cabinet/garage/', // :id
    [Routes.UsersPage]: '/cabinet/users/',
    [Routes.MyDetails]: '/cabinet/my-details/',
    [Routes.CategoryDetailPage]: '/cabinet/category-details/',
    [Routes.CategoryServicePage]: '/cabinet/category-services/',
    [Routes.Brands]: '/cabinet/brands',
    [Routes.MyRequest]: '/cabinet/my-request/', // :id

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

    [Routes.LoginOrganization]: {
        path: RoutePaths.LoginOrganization,
        element: <PageLoginOrganization />,
        onlyAuth: false
    },

    [Routes.ProfilePage]: {
        path: `${RoutePaths.ProfilePage}:id`,
        element: <PageProfile />,
        onlyAuth: true
    },

    [Routes.GaragePage]: {
        path: `${RoutePaths.GaragePage}:id`,
        element: <PageGarage />,
        onlyAuth: true,
        permissionForUserRole: [UserRoles.Admin, UserRoles.Moderator, UserRoles.Person]
    },

    [Routes.MyDetails]: {
        path: `${RoutePaths.MyDetails}:id`,
        element: <PageMyDetail />,
        onlyAuth: true,
    },


    [Routes.MyRequest]: {
        path: `${RoutePaths.MyRequest}:id`,
        element: <PageMyRequest />,
        onlyAuth: true,
    },

    [Routes.UsersPage]: {
        path: `${RoutePaths.UsersPage}`,
        element: <PageUsers />,
        onlyAuth: true,
        permissionForUserRole: [UserRoles.Admin]
    },

    [Routes.CategoryDetailPage]: {
        path: `${RoutePaths.CategoryDetailPage}`,
        element: <PageCategoryDetails />,
        onlyAuth: true,
        permissionForUserRole: [UserRoles.Admin]
    },

    [Routes.CategoryServicePage]: {
        path: `${RoutePaths.CategoryServicePage}`,
        element: <PageCategoryServices />,
        onlyAuth: true,
        permissionForUserRole: [UserRoles.Admin]
    },


    [Routes.Brands]: {
        path: `${RoutePaths.Brands}`,
        element: <PageBrands />,
        onlyAuth: true,
        permissionForUserRole: [UserRoles.Admin]
    },

    /*not found page - всегда последний в мапе*/
    [Routes.NotFoundPage]: {
        path: RoutePaths.NotFoundPage,
        element: <Page404 />,
        onlyAuth: false
    }
}