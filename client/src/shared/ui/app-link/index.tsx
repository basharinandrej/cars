import {ReactNode, FC} from 'react'
import { Link, LinkProps } from 'react-router-dom'



export const AppLink:FC<AppLink> = props => {
    const {to, children} = props
    return (
        <Link to={to} >{children}</Link>
    )
}

interface AppLink extends LinkProps {
    children: ReactNode
}