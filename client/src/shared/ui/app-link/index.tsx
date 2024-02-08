import {ReactNode, FC} from 'react'
import { Link, LinkProps } from 'react-router-dom'
import styles from './index.module.sass'


export const AppLink:FC<AppLink> = props => {
    const {to, children} = props
    return (
        <Link to={to} className={styles.link}>{children}</Link>
    )
}

interface AppLink extends LinkProps {
    children: ReactNode
}