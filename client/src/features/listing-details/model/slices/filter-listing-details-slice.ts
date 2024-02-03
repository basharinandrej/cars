import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface FilterListingDetailsSchema {
    search: string
}

const initialState: FilterListingDetailsSchema = {
  search: window.location.search.split('=')[1]
}

export const filterListingDetailsSlice = createSlice({
  name: 'filter-listing-details',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
        state.search = action.payload
    }
  },
})

export const {setSearch} = filterListingDetailsSlice.actions

export const filterListingDetailsReducer = filterListingDetailsSlice.reducer