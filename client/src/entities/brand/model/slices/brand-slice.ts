import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {Brand, BrandResponse} from '../../interfaces'
import { fetchBrands } from '../async-action/fetch-brands'

export interface BrandSchema extends BrandResponse {
  selectedCategoryDetailForUpdate: Brand
}

const initialState: BrandSchema = {
    total: null,
    items: [],
    selectedCategoryDetailForUpdate: null
}

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    selectedBrandForUpdate: (state, action: PayloadAction<number>) => {
      state.selectedCategoryDetailForUpdate = state.items.find((item) => item.id === action.payload)
    },
    updateSelectedBrand: (state, action: PayloadAction<Partial<unknown>>) => {
      state.selectedCategoryDetailForUpdate = {
          ...state.selectedCategoryDetailForUpdate, ...action.payload
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBrands.fulfilled, (state, action: PayloadAction<BrandResponse>) => {
        state.items = action.payload?.items
        state.total = action.payload?.total
      })
  }
})

export const {selectedBrandForUpdate, updateSelectedBrand} = brandSlice.actions
export const brandReducer = brandSlice.reducer