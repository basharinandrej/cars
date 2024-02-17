import {Suspense} from 'react'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider, AppRoutes, ErrorBoundary } from "@app"
import {MainLayout} from '@widgets';
import { YMaps} from '@pbe/react-yandex-maps'

import './styles/index.sass'

const App = () => {
    return (
        <StoreProvider>
            <BrowserRouter>
                <ErrorBoundary>
                    <Suspense fallback={<h1>Suspense....</h1>}>
                        <MainLayout>
                            <YMaps>
                                <AppRoutes />
                            </YMaps>
                        </MainLayout>
                    </Suspense>
                </ErrorBoundary>
            </BrowserRouter>
        </StoreProvider>
    )
}

export default App