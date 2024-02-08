import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider, AppRoutes, ErrorBoundary } from "@app"
import {MainLayout} from '@widgets';
import './styles/index.sass'

const App = () => {
    return (
        <StoreProvider>
            <BrowserRouter>
                <ErrorBoundary>
                    <MainLayout>
                        <AppRoutes />
                    </MainLayout>
                </ErrorBoundary>
            </BrowserRouter>
        </StoreProvider>
    )
}

export default App