import {RootState} from '@app'


export const getIsLoadingListingDetails = (state: RootState) => state.listingDetails.isLoading
export const getItemsListingDetails = (state: RootState) => state.listingDetails.items

export const getLimitListingDetails = (state: RootState) => state.listingDetails.limit
export const getOffsetListingDetails = (state: RootState) => state.listingDetails.offset
export const getCategoryIdListingDetails = (state: RootState) => state.listingDetails.catagoryId
export const getModelIdListingDetails = (state: RootState) => state.listingDetails.modelId
export const getTotalListingDetails = (state: RootState) => state.listingDetails.total
export const getLengthItemsListingDetails = (state: RootState) => state.listingDetails.items?.length


export const getSearchFilterListingDetails = (state: RootState) => state.filterListingDetails.search
