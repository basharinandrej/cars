import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider, AppRoutes } from "@app"
import {MainLayout} from '@widgets';
import './styles/index.sass'

const App = () => {
    return (
        <StoreProvider>
            <BrowserRouter>
                <MainLayout>
                    <AppRoutes />
                </MainLayout>
            </BrowserRouter>
        </StoreProvider>
    )
}

export default App