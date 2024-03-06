import {RootState} from '@app'

export const getCategoryServiceData = (state: RootState) => state.addNewCategoryService.categoryService
export const getIsLoading = (state: RootState) => state.addNewCategoryService.isLoading
export const getError = (state: RootState) => state.addNewCategoryService.error