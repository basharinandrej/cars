import { Garage } from '@entities'
import {useParams} from 'react-router-dom'
import { AddNewCard } from '@features'


const PageGarage = () => {
    const {id} = useParams()

    return (
       <>
            <AddNewCard />
            <Garage id={Number(id)}/>
       </>
    )
}

export default PageGarage