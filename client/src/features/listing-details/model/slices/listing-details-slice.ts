import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ListingDetailsResponse} from '../../interfaces'

import {fetchInitialListingDetails} from '../async-actions/fetch-initial-listing-details'
import { fetchListingDetailsNextPart } from '../async-actions/fetch-listing-details-next-part'

import {DEFAULT_VALUE_LIMIT, INITIAL_VALUE_OFFSET} from '../../constans'
import {calcOffset} from '../utils/calc-offset'


export interface ListingDetailsSchema extends ListingDetailsResponse {
  isLoading: boolean
  limit: number
  offset: number
  canPaginationMore: boolean
  scrollPostion: number
}

const initialState: ListingDetailsSchema = {
  items: [],
  total: 0,
  isLoading: false,
  limit: DEFAULT_VALUE_LIMIT,
  offset: INITIAL_VALUE_OFFSET,
  canPaginationMore: false,
  scrollPostion: 0
}

export const listingDetailsSlice = createSlice({
  name: 'listing-details',
  initialState,
  reducers: {
    keepScrollPosition: (state, action: PayloadAction<number>) => {
      state.scrollPostion = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchInitialListingDetails.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchInitialListingDetails.fulfilled, (state, action: PayloadAction<ListingDetailsResponse>) => {
            const data = action.payload

            state.isLoading = false
            state.items = data.items
            state.total = data.total
            state.offset = INITIAL_VALUE_OFFSET + data.items?.length
            state.canPaginationMore = data?.total > data.items?.length
        })


        //Next Parts
        .addCase(fetchListingDetailsNextPart.pending, (state) => {
          state.isLoading = true
        })
        .addCase(fetchListingDetailsNextPart.fulfilled, (state, action: PayloadAction<ListingDetailsResponse>) => {
          const data = action.payload

          state.isLoading = false
          state.total = data.total
          state.items = state.items.concat(data.items)
          state.offset = calcOffset(state)
          state.canPaginationMore = data.total > state.items?.length
        })
  }
})

export const {keepScrollPosition} = listingDetailsSlice.actions

export const listingDetailsReducer = listingDetailsSlice.reducer