import {RootState} from '@app'

export const getModelsItems = (state: RootState) => state.model.rows
export const getSelectedModel = (state: RootState) => state.model.selectedModelForUpdate