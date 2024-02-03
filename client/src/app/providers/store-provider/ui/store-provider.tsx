import React, {FC, ReactNode} from 'react'
import {Provider} from 'react-redux'
import {store} from '../config/store'

export const StoreProvider: FC<StoreProviderProps> = ({children}) => {

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

interface StoreProviderProps {
    children: ReactNode
}
