import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import {
    listingDetailsReducer, 
    filterListingDetailsReducer,
    filterListingOrganizationsReducer,
    detailInformationReducer,
    listingOrganizationReducer,
    organizationInformationReducer,
    loginUserReducer
} from '@features'
import {
    menuSliceReducer,
    logoSliceReducer, 
    profileReducer,
    sidebarSliceReducer, 
    carsReduces
} from '@entities'
import {instanceAxios} from '@shared'

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
        cars: carsReduces
    }

    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    api: instanceAxios
                }
            }
        })
    })
}

export const store = getStore()

