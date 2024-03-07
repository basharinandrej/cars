import {RootState} from '@app'

export const getBrandsItems = (state: RootState) => state.brand.items
export const getSelectedBrand = (state: RootState) => state.brand.selectedBrandForUpdate