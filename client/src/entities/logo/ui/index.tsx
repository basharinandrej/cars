import { AppLink } from "@shared"
import {useSelector} from 'react-redux'
import {getLogo} from '../model/selectors'



export const Logo = () => {
    const logo = useSelector(getLogo)
    
    return (
        <AppLink to={logo.path}>{logo.text}</AppLink>
    )
}