import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {BrandResponse} from '../../interfaces/interfaces'
import {fetchListingBrands} from '../async-actions/fetch-listing-brands'



export interface FilterListingDetailsSchema {
    search: string
    brand: BrandResponse
}

const initialState: FilterListingDetailsSchema = {
  search: window.location.search.split('=')[1],
  brand: {
    items: [
      {
        value: '1',
        label: 'Lada',
      },
      {
        value: '2',
        label: 'Kia',
      }
  ],
    total: 0
  }
}

export const filterListingDetailsSlice = createSlice({
  name: 'filter-listing-details',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
        state.search = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListingBrands.pending, (state) => {

      })
      .addCase(fetchListingBrands.fulfilled, (state, action: PayloadAction<BrandResponse>) => {
        const data = action.payload

        state.brand.items = data.items
        state.brand.total = data.total
      })
  }
})

export const {setSearch} = filterListingDetailsSlice.actions

export const filterListingDetailsReducer = filterListingDetailsSlice.reducer