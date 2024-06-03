import {RootState} from '@app'

export const getModelData = (state: RootState) => state.addNewModel.model
export const getIsLoading = (state: RootState) => state.addNewModel.isLoading
export const getError = (state: RootState) => state.addNewModel.error
export const getBrands = (state: RootState) => state.model.brands.rows