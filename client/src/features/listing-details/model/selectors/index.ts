import {RootState} from '@app'


export const getIsLoadingListingDetails = (state: RootState) => state.listingDetails.isLoading
export const getItemsListingDetails = (state: RootState) => state.listingDetails.items
export const getLimitListingDetails = (state: RootState) => state.listingDetails.limit
export const getOffsetListingDetails = (state: RootState) => state.listingDetails.offset
export const getCanPaginationMoreListingDetails = (state: RootState) => state.listingDetails.canPaginationMore
export const getScrollPositionListingDetails = (state: RootState) => state.listingDetails.scrollPostion

export const getSearchGlobalFilterListingDetails = (state: RootState) => state.filterListingDetails.searchGlobal

export const getFilterListingBrands = (state: RootState) => state.filterListingDetails.brand.items
export const getFilterListingModels = (state: RootState) => state.filterListingDetails.model.items
export const getFilterListingCategories = (state: RootState) => state.filterListingDetails.category.items

export const getFilterSelectedBrandValue = (state: RootState) => state.filterListingDetails.brand.selected?.value
export const getFilterSelectedBrandLabel= (state: RootState) => state.filterListingDetails.brand.selected?.label

export const getFilterSelectedModelValue = (state: RootState) => state.filterListingDetails.model.selected?.value
export const getFilterSelectedModelLabel= (state: RootState) => state.filterListingDetails.model.selected?.label

export const getFilterSelectedCategoryValue = (state: RootState) => state.filterListingDetails.category.selected?.value
export const getFilterSelectedCategoryLabel= (state: RootState) => state.filterListingDetails.category.selected?.label
