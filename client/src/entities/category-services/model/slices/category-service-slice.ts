import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {CategoryService, CategoryServicesResponse} from '../../interfaces'
import {fetchCategoryServices} from '../async-actions/fetch-category-service'

export interface CategoryServicesSchema extends CategoryServicesResponse {
  selectedCategoryServiceForUpdate: CategoryService
}

const initialState: CategoryServicesSchema = {
    total: null,
    items: [],
    selectedCategoryServiceForUpdate: null
}

export const categoryServicesSlice = createSlice({
  name: 'categoryServices',
  initialState,
  reducers: {
    selectedCategoryServiceForUpdate: (state, action: PayloadAction<number>) => {
      state.selectedCategoryServiceForUpdate = state.items.find((item) => item.id === action.payload)
    },
    updateSelectedCategoryService: (state, action: PayloadAction<Partial<CategoryService>>) => {
      state.selectedCategoryServiceForUpdate = {
          ...state.selectedCategoryServiceForUpdate, ...action.payload
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategoryServices.fulfilled, (state, action: PayloadAction<CategoryServicesResponse>) => {
        state.items = action.payload.items
        state.total = action.payload.total
      })
  }
})

export const {selectedCategoryServiceForUpdate, updateSelectedCategoryService} = categoryServicesSlice.actions
export const categoryServicesReducer = categoryServicesSlice.reducer