import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {BrandResponse} from '../../interfaces'
import {fetchListingBrands} from '../async-actions/fetch-listing-brands'
import { EMPTY_STRING, dropQuerySearch, getQuerySearchFromUrl } from '@shared'


export interface FilterListingDetailsSchema {
    search: string
    brand: BrandResponse
}

const initialState: FilterListingDetailsSchema = {
  search: getQuerySearchFromUrl(),
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
    total: 2
  }
}

export const filterListingDetailsSlice = createSlice({
  name: 'filter-listing-details',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    dropSearch: (state) => {
      dropQuerySearch()
      state.search = EMPTY_STRING
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

export const {setSearch, dropSearch} = filterListingDetailsSlice.actions

export const filterListingDetailsReducer = filterListingDetailsSlice.reducer