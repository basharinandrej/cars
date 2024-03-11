import {Navigate} from 'react-router-dom'
import {RoutePaths} from './routers-config'
import {useSelector} from 'react-redux'
import {getUserRole,getOrganizationId, getUserId} from '@entities'
import { UserRoles } from '@shared'

export const ProtectedRoute = ({children, permissionForUserRole}: ProtectedRouteProps): JSX.Element => {
    const userId = useSelector(getUserId)
    const organizationId = useSelector(getOrganizationId)
    const roleFromStore = useSelector(getUserRole)

    if(Array.isArray(permissionForUserRole) && permissionForUserRole.length) {
        if(!permissionForUserRole.includes(roleFromStore)) {
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
    permissionForUserRole: UserRoles | UserRoles[]
}