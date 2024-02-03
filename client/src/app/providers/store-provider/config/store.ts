import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import {listingDetailsReducer, filterListingDetailsReducer} from '@features'
import {StateSchema} from '../interfaces'

const getStore = () => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        listingDetails: listingDetailsReducer,
        filterListingDetails: filterListingDetailsReducer
    }

    return configureStore({
        reducer: rootReducer
    })
}

export const store = getStore()

