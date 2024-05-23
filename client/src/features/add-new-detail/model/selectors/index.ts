import {RootState} from '@app'



export const getItemsDetailCategories = (state: RootState) => state.addNewDetail.detailCategories.rows
export const getItemsModels = (state: RootState) => state.addNewDetail.models.rows
export const getOptionsWear = (state: RootState) => state.addNewDetail.optionsWear
export const getDataDetail = (state: RootState) => state.addNewDetail.detail

export const getPhotosDetail = (state: RootState) => state.addNewDetail.detail.photos
