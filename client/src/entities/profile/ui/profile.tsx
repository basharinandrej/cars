import { useSelector } from 'react-redux'
import {getDataUser} from '../model/selectors'



export const Profile = () => {
    
    const user = useSelector(getDataUser)
    
    return (
        <div>
            <p>{user.name}</p>
            <p>{user.surname}</p>
            <p>{user.email}</p>
            <p>{user.phoneNumber}</p>
            <p>{user.role}</p>
        </div>
    )
}