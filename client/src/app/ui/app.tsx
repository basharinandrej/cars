import {useCallback} from 'react'
import {RouteProps} from 'react-router-dom'
import { mapRoutes } from '../providers/app-routers/config/routers-config'
import { Routes, Route } from 'react-router-dom'

export const AppRoutes = () => {

    const renderRoutes = useCallback(({element, path}: RouteProps, idx: number) => {
        if(!path) return
        return (
                <Route
                    key={path + idx}
                    path={path}
                    element={element}
                />
        )
    }, [])

    return (
        <Routes>
            {Object.values(mapRoutes).map(renderRoutes)}
        </Routes>
    )
}