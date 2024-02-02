import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import {listingDetailsReducer} from '../../../../features'
import {StateSchema} from '../interfaces'

const getStore = () => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        listingDetails: listingDetailsReducer
    }

    return configureStore({
        reducer: rootReducer
    })
}

export const store = getStore()

