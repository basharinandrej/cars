import {RootState} from '@app'

export const getCategoryDetailsItems = (state: RootState) => state.categoryDetails.items
export const getSelectedCategoryDetail = (state: RootState) => state.categoryDetails.selectedCategoryDetailForUpdate