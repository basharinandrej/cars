import {RootState} from '@app'



export const getItemsDetailCategories = (state: RootState) => state.addNewDetail.detailCategories.items
export const getItemsModels = (state: RootState) => state.addNewDetail.models.items
export const getOptionsWear = (state: RootState) => state.addNewDetail.optionsWear