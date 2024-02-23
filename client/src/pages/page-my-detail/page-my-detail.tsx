import {AddNewDetail, ListingDetails} from '@features'
import {useParams} from 'react-router-dom'

const PageMyDetail = () => {
    const {id} = useParams()


    return <>
        <AddNewDetail />
        <ListingDetails id={Number(id)} />
    </>
}

export default PageMyDetail