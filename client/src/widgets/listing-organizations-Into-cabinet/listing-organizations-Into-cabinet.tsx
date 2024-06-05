import {
    ListingOrganization, 
    FilterOrganizationListing
} from '@features'


export const ListingOrganizationsIntoCabinet = () => {



    return <>
        <FilterOrganizationListing />
        <ListingOrganization isCabinet={true}/>
    </>
}