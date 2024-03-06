import {RootState} from '@app'

export const getCategoryServicesItems = (state: RootState) => state.categoryServices.items
export const getSelectedCategoryService = (state: RootState) => state.categoryServices.selectedCategoryServiceForUpdate