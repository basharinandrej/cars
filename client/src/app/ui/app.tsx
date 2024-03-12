import {useCallback} from 'react'
import { mapRoutes } from '../providers/app-routers/config/routers-config'
import { Routes, Route } from 'react-router-dom'
import { AppRouteProps } from '../providers/app-routers/types'
import {ProtectedRoute} from '../providers/app-routers/config/protected-route'

export const AppRoutes = () => {

    const renderRoutes = useCallback(({element, path, onlyAuth, onlyOrganization, permissionForUserRole}: AppRouteProps, idx: number) => {
        if(!path) return
        return (
                <Route
                    key={path + idx}
                    path={path}
                    element={
                        onlyAuth
                            ? <ProtectedRoute onlyOrganization={onlyOrganization} permissionForUserRole={permissionForUserRole} children={element as JSX.Element}/>
                            : element
                    }
                />
        )
    }, [])

    return (
        <Routes>
            {Object.values(mapRoutes).map(renderRoutes)}
        </Routes>
    )
}