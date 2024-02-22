import {Navigate} from 'react-router-dom'
import {RoutePaths} from './routers-config'
import {useSelector} from 'react-redux'
import {getIdUser, getUserRole} from '@entities'
import { UserRoles } from '@shared'

export const ProtectedRoute = ({children, userRole}: ProtectedRouteProps): JSX.Element => {
    const userId = useSelector(getIdUser)
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