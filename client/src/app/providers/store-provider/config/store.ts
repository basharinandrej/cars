import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import {listingDetailsReducer, filterListingDetailsReducer} from '@features'
import {instanceAxios} from '@shared'
import {StateSchema} from '../interfaces'

const getStore = () => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        listingDetails: listingDetailsReducer,
        filterListingDetails: filterListingDetailsReducer
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

