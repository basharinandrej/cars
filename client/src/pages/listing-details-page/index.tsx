import { Fragment } from "react"
import { ListingDetails, FilterListingDetails } from '@features'



export const ListingDetailsPage = () => {
    

    return (
        <Fragment>
            <FilterListingDetails/>
            <ListingDetails/>
        </Fragment>
    )
}