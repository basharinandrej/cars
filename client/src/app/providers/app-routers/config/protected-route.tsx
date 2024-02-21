import {Navigate} from 'react-router-dom'
import {RoutePaths} from './routers-config'
import {useSelector} from 'react-redux'
import {getIdUser} from '@entities'

export const ProtectedRoute = ({children}: ProtectedRouteProps): JSX.Element => {
    const userId = useSelector(getIdUser)

    console.log(">>>> userId", userId)
    if(!userId) {
        return <Navigate to={RoutePaths.Home} replace />
    }

    return children
}

interface ProtectedRouteProps {
    children: JSX.Element
}