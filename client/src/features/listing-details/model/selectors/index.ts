import {RootState} from '../../../../app/providers'


export const getIsLoadingListingDetails = (state: RootState) => state.listingDetails.isLoading
export const getItemsListingDetails = (state: RootState) => state.listingDetails.items

export const getLimitListingDetails = (state: RootState) => state.listingDetails.limit
export const getOffsetListingDetails = (state: RootState) => state.listingDetails.offset
export const getCategoryIdListingDetails = (state: RootState) => state.listingDetails.catagoryId
export const getModelIdListingDetails = (state: RootState) => state.listingDetails.modelId