import {ListingDetails, AddNewDetail, fetchInitialListingDetails} from '@features'
import { useAppDispatch } from '@shared'
import {useParams} from 'react-router-dom'



export const AddDetailAndListingDetails = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()

    const onSuccessAddNewDatailHandler = () => {
        dispatch(fetchInitialListingDetails())
    }
    return (
        <>
            <AddNewDetail onSuccess={onSuccessAddNewDatailHandler} />
            <ListingDetails id={Number(id)} />
        </>
    )
}