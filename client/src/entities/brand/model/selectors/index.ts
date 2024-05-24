import {RootState} from '@app'

export const getBrandsItems = (state: RootState) => state.brand.rows
export const getSelectedBrand = (state: RootState) => state.brand.selectedBrandForUpdate