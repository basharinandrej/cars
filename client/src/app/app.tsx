import {Suspense} from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from "./ui/app"
import {ErrorBoundary} from './providers/error-boundary'
import {MainLayout} from '@widgets';
import { YMaps} from '@pbe/react-yandex-maps'
import { useMount, useAppDispatch } from '@shared';
import {featchInitUser} from '@entities'

import '../styles/index.sass'

export const App = () => {
    const dispatch = useAppDispatch()

    useMount(() => {
        const userId = JSON.parse(localStorage.getItem('userId'))
        userId && dispatch(featchInitUser())
    })

    return (
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
    )
}

