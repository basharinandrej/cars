import {RootState} from '@app'


export const getIsLoadingListingDetails = (state: RootState) => state.listingDetails.isLoading
export const getItemsListingDetails = (state: RootState) => state.listingDetails.items
export const getLimitListingDetails = (state: RootState) => state.listingDetails.limit
export const getOffsetListingDetails = (state: RootState) => state.listingDetails.offset
export const getTotalListingDetails = (state: RootState) => state.listingDetails.total
export const getLengthItemsListingDetails = (state: RootState) => state.listingDetails.items?.length


export const getSearchFilterListingDetails = (state: RootState) => state.filterListingDetails.search
export const getFilterListingBrands = (state: RootState) => state.filterListingDetails.brand.items
export const getFilterListingModels = (state: RootState) => state.filterListingDetails.model.items
export const getFilterSelectedBrandId = (state: RootState) => state.filterListingDetails.brand.selected
export const getFilterSelectedModelId = (state: RootState) => state.filterListingDetails.model.selected
