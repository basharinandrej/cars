import {RootState} from '@app'


export const getItemsListingOrganizations = (state: RootState) => state.listingOrganization.items
export const getIsLoadingListingOrganizations = (state: RootState) => state.listingOrganization.isLoading
export const getLimitListingOgranizations = (state: RootState) => state.listingOrganization.limit
export const getOffsetListingOgranizations = (state: RootState) => state.listingOrganization.offset
export const getCanPaginationMoreListingOrganization = (state: RootState) => state.listingOrganization.canPaginationMore

export const getStatusFilterListingOrganization = (state: RootState) => state.filterListingOrganization.status
export const getOptionsFilterListingOrganization = (state: RootState) => state.filterListingOrganization.optionsStatusOrganization

export const getFilterListingServiceCategories = (state: RootState) => state.filterListingOrganization.serviceCategories.items
export const getFilterSelectedServiceCategoryLabel= (state: RootState) => state.filterListingOrganization.serviceCategories.selected?.label
export const getFilterSelectedServiceCategoryValue= (state: RootState) => state.filterListingOrganization.serviceCategories.selected?.value