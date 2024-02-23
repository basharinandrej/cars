import {Navigate} from 'react-router-dom'
import {RoutePaths} from './routers-config'
import {useSelector} from 'react-redux'
import {getUserRole} from '@entities'
import { UserRoles, APP_CAR_KEY_LS_USER_ID } from '@shared'

export const ProtectedRoute = ({children, userRole}: ProtectedRouteProps): JSX.Element => {
    const userId = JSON.parse(localStorage.getItem(APP_CAR_KEY_LS_USER_ID))
    const role = useSelector(getUserRole)

    if(userRole) {
        if(userRole !== role) {
            return <Navigate to={RoutePaths.Home} replace />
        }
    }
    if(!userId) {
        return <Navigate to={RoutePaths.Home} replace />
    }

    return children
}

interface ProtectedRouteProps {
    children: JSX.Element
    userRole: UserRoles
}