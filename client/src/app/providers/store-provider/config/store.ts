import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import {
    listingDetailsReducer, 
    filterListingDetailsReducer,
    detailInformationReducer
} from '@features'
import {menuSliceReducer, logoSliceReducer} from '@entities'
import {instanceAxios} from '@shared'

import {StateSchema} from '../interfaces'

const getStore = () => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        listingDetails: listingDetailsReducer,
        filterListingDetails: filterListingDetailsReducer,
        detailInformation: detailInformationReducer,
        menu: menuSliceReducer,
        logo: logoSliceReducer
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

