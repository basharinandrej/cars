import {Navigate} from 'react-router-dom'
import {RoutePaths} from './routers-config'
import {useSelector} from 'react-redux'
import {getUserRole,getOrganizationId, getUserId} from '@entities'
import { UserRoles } from '@shared'

export const ProtectedRoute = ({children, userRole}: ProtectedRouteProps): JSX.Element => {
    const userId = useSelector(getUserId)
    const organizationId = useSelector(getOrganizationId)
    const roleFromStor = useSelector(getUserRole)

    if(userRole) {
        if(userRole !== roleFromStor) {
            return <Navigate to={RoutePaths.Home} replace />
        }
    }
    if(!(userId || organizationId)) {
        return <Navigate to={RoutePaths.Home} replace />
    }

    return children
}

interface ProtectedRouteProps {
    children: JSX.Element
    userRole: UserRoles
}