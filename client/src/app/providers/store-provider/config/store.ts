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
    addNewBrandReducer,
    servicesReducer,
    addNewServiceReducer,
    addNewModelReducer,
    registrationUserReducer,
    registrationOrganizationReducer
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
    brandReducer,
    modelReducer
} from '@entities'
import {instanceAxios, getErrorMessage} from '@shared'
import {notification} from 'antd'

import {StateSchema} from '../interfaces'
import { NotificationPlacements } from 'antd/es/notification/interface'

const getStore = () => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        listingDetails: listingDetailsReducer,
        filterListingDetails: filterListingDetailsReducer,

        listingOrganization: listingOrganizationReducer,
        filterListingOrganization:filterListingOrganizationsReducer,

        detailInformation: detailInformationReducer,
        organizationInformation: organizationInformationReducer,
        
        registrationUser: registrationUserReducer,
        registrationOrganization: registrationOrganizationReducer,
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
        model: modelReducer,
        addNewBrand: addNewBrandReducer,
        addNewModel: addNewModelReducer,
        services: servicesReducer,
        addNewService: addNewServiceReducer
    }

    notification.config({placement: NotificationPlacements[5]})

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

