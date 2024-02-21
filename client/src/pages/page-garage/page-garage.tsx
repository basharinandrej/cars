import { Garage } from '@entities'
import {useParams} from 'react-router-dom'


const PageGarage = () => {
    const {id} = useParams()

    return (
        <Garage id={id} />
    )
}

export default PageGarage