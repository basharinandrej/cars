import {Suspense} from 'react'
import { useLocation } from 'react-router-dom'
import { AppRoutes } from "./ui/app"
import {ErrorBoundary} from './providers/error-boundary'
import {MainLayout, InnerLayout} from '@widgets';
import { YMaps} from '@pbe/react-yandex-maps'
import { useMount, useAppDispatch, APP_CAR_KEY_LS_USER_ID } from '@shared';
import {featchInitUser} from '@entities'

import '../styles/index.sass'

export const App = () => {
    const dispatch = useAppDispatch()

    const location = useLocation();
    const inInnerPage = location.pathname.substring(1, 8) === 'cabinet'

    const Layout = inInnerPage ? InnerLayout : MainLayout
    
    useMount(() => {
        const userId = JSON.parse(localStorage.getItem(APP_CAR_KEY_LS_USER_ID))
        userId && dispatch(featchInitUser())
    })

    return (
        <ErrorBoundary>
            <Suspense fallback={<h1>Suspense....</h1>}>
                <Layout>
                    <YMaps>
                        <AppRoutes />
                    </YMaps>
                </Layout>
            </Suspense>
        </ErrorBoundary>
    )
}
