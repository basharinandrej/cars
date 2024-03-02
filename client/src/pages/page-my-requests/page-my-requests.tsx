import {useParams} from 'react-router-dom'
import {RequestsLisintg} from '@features'
const PageMyRequest= () => {
    const {id} = useParams()


    return <RequestsLisintg id={Number(id)}/>
}

export default PageMyRequest