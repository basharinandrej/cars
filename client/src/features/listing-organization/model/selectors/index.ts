import {RootState} from '@app'


export const getItemsListingOrganizations = (state: RootState) => state.listingOrganization.items
export const getIsLoadingListingOrganizations = (state: RootState) => state.listingOrganization.isLoading
export const getLimitListingOgranizations = (state: RootState) => state.listingOrganization.limit
export const getOffsetListingOgranizations = (state: RootState) => state.listingOrganization.offset
export const getCanPaginationMoreListingOrganization = (state: RootState) => state.listingOrganization.canPaginationMore
