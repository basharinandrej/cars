import {RootState} from '@app'

export const getCategoryDetailData = (state: RootState) => state.addNewCategoryDetail.categoryDetail
export const getIsLoading = (state: RootState) => state.addNewCategoryDetail.isLoading
export const getError = (state: RootState) => state.addNewCategoryDetail.error