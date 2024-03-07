import {RootState} from '@app'

export const getBrandData = (state: RootState) => state.addNewBrand.brand
export const getIsLoading = (state: RootState) => state.addNewBrand.isLoading
export const getError = (state: RootState) => state.addNewBrand.error