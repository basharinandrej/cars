import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import {
    listingDetailsReducer, 
    filterListingDetailsReducer,
    filterListingOrganizationsReducer,
    detailInformationReducer,
    listingOrganizationReducer,
    organizationInformationReducer,
    loginUserReducer,
    addNewCarReducer,
    addNewDetailReducer,
    addNewRequestReducer,
    loginOrganizationReducer,
    addNewCategoryDetailReducer,
    addNewCategoryServiceReducer,
    addNewBrandReducer
} from '@features'
import {
    menuSliceReducer,
    logoSliceReducer, 
    profileReducer,
    sidebarSliceReducer, 
    carsReduces,
    usersReducers,
    requestReducer,
    categoryDetailsReducer,
    categoryServicesReducer,
    brandReducer
} from '@entities'
import {instanceAxios, getErrorMessage} from '@shared'
import {notification} from 'antd'

import {StateSchema} from '../interfaces'

const getStore = () => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        listingDetails: listingDetailsReducer,
        filterListingDetails: filterListingDetailsReducer,

        listingOrganization: listingOrganizationReducer,
        filterListingOrganization:filterListingOrganizationsReducer,

        detailInformation: detailInformationReducer,
        organizationInformation: organizationInformationReducer,
        
        loginUser: loginUserReducer,
        loginOrganization: loginOrganizationReducer,
        profile: profileReducer,

        menu: menuSliceReducer,
        logo: logoSliceReducer,
        sidebar: sidebarSliceReducer,
        cars: carsReduces,
        addNewCar: addNewCarReducer,

        addNewDetail: addNewDetailReducer,
        users: usersReducers,
        addNewRequest: addNewRequestReducer,
        request: requestReducer,
        categoryDetails: categoryDetailsReducer,
        addNewCategoryDetail: addNewCategoryDetailReducer,

        categoryServices: categoryServicesReducer,
        addNewCategoryService: addNewCategoryServiceReducer,

        brand: brandReducer,
        addNewBrand: addNewBrandReducer
    }

    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
            thunk: {
                extraArgument: {
                    api: instanceAxios,
                    notificationApi: notification,
                    getErrorMessage
                }
            }
        })
    })
}

export const store = getStore()

