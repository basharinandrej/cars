import {Suspense} from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppRoutes } from "./ui/app"
import {ErrorBoundary} from './providers/error-boundary'
import {MainLayout, InnerLayout} from '@widgets';
import { YMaps} from '@pbe/react-yandex-maps'
import { useMount, useAppDispatch } from '@shared';
import {featchInitUser, featchInitOrganization, getUserId, getOrganizationId} from '@entities'

import '../styles/index.sass'

export const App = () => {
    const dispatch = useAppDispatch()

    const userId = useSelector(getUserId)
    const organizationId = useSelector(getOrganizationId)
    const location = useLocation();
    const inInnerPage = location.pathname.slice(1, 8) === 'cabinet'

    const Layout = inInnerPage ? InnerLayout : MainLayout
    
    
    useMount(() => {
        userId && dispatch(featchInitUser())
        organizationId && dispatch(featchInitOrganization())
    })

    return (
        <ErrorBoundary>
            <Suspense fallback={<h1>Загрузка....</h1>}>
                <Layout>
                    <YMaps>
                        <AppRoutes />
                    </YMaps>
                </Layout>
            </Suspense>
        </ErrorBoundary>
    )
}

