import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {Brand, BrandResponse} from '../../interfaces'
import { fetchBrands } from '../async-action/fetch-brands'

export interface BrandSchema extends BrandResponse {
  selectedBrandForUpdate: Brand
}

const initialState: BrandSchema = {
    count: null,
    rows: [],
    selectedBrandForUpdate: null
}

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    selectedBrandForUpdate: (state, action: PayloadAction<number>) => {
      state.selectedBrandForUpdate = state.rows.find((item) => item.id === action.payload)
    },
    updateSelectedBrand: (state, action: PayloadAction<Partial<unknown>>) => {
      state.selectedBrandForUpdate = {
          ...state.selectedBrandForUpdate, ...action.payload
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBrands.fulfilled, (state, action: PayloadAction<BrandResponse>) => {
        state.rows = action.payload?.rows
        state.count = action.payload?.count
      })
  }
})

export const {selectedBrandForUpdate, updateSelectedBrand} = brandSlice.actions
export const brandReducer = brandSlice.reducer