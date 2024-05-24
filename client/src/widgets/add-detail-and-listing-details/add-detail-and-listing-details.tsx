import {ListingDetails, AddNewDetail} from '@features'
import {useParams} from 'react-router-dom'



export const AddDetailAndListingDetails = () => {
    const {id} = useParams()

    return (
        <>
            <AddNewDetail />
            <ListingDetails id={Number(id)} />
        </>
    )
}