import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {CategoryDetail, CategoryDetailsResponse} from '../../interfaces'
import {fetchCategoryDetails} from '../async-actions/fetch-category-details'

export interface CategoryDetailsSchema extends CategoryDetailsResponse {
  selectedCategoryDetailForUpdate: CategoryDetail
}

const initialState: CategoryDetailsSchema = {
    count: null,
    rows: [],
    selectedCategoryDetailForUpdate: null
}

export const categoryDetailsSlice = createSlice({
  name: 'categoryDetails',
  initialState,
  reducers: {
    selectedCategoryDetailForUpdate: (state, action: PayloadAction<number>) => {
      state.selectedCategoryDetailForUpdate = state.rows.find((item) => item.id === action.payload)
    },
    updateSelectedCategoryDetail: (state, action: PayloadAction<Partial<unknown>>) => {
      state.selectedCategoryDetailForUpdate = {
          ...state.selectedCategoryDetailForUpdate, ...action.payload
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategoryDetails.fulfilled, (state, action: PayloadAction<CategoryDetailsResponse>) => {
        state.rows = action.payload.rows
        state.count = action.payload.count
      })
  }
})

export const {selectedCategoryDetailForUpdate, updateSelectedCategoryDetail} = categoryDetailsSlice.actions
export const categoryDetailsReducer = categoryDetailsSlice.reducer