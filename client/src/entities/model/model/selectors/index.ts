import {RootState} from '@app'

export const getModelsItems = (state: RootState) => state.model.rows
export const getSelectedModel = (state: RootState) => state.model.selectedModelForUpdate

export const getBrands = (state: RootState) => state.model.brands.rows