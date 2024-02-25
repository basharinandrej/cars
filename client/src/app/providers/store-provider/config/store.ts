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
    addNewDetailReducer
} from '@features'
import {
    menuSliceReducer,
    logoSliceReducer, 
    profileReducer,
    sidebarSliceReducer, 
    carsReduces
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
        profile: profileReducer,

        menu: menuSliceReducer,
        logo: logoSliceReducer,
        sidebar: sidebarSliceReducer,
        cars: carsReduces,
        addNewCar: addNewCarReducer,

        addNewDetail: addNewDetailReducer
    }

    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
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

