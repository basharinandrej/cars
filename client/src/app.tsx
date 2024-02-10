import React, {Suspense} from 'react'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider, AppRoutes, ErrorBoundary } from "@app"
import {MainLayout} from '@widgets';
import './styles/index.sass'

const App = () => {
    return (
        <StoreProvider>
            <BrowserRouter>
                <ErrorBoundary>
                    <Suspense fallback={<h1>Suspense....</h1>}>
                        <MainLayout>
                            <AppRoutes />
                        </MainLayout>
                    </Suspense>
                </ErrorBoundary>
            </BrowserRouter>
        </StoreProvider>
    )
}

export default App