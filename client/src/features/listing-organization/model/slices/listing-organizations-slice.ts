import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ListingOrganizationsResponse} from '../../interfaces'
import {fetchInitialListingOrganizations} from '../async-actions/fetch-initial-listing-organizations'

import {DEFAULT_VALUE_LIMIT, INITIAL_VALUE_OFFSET} from '../../constans'

export interface ListingOrganizationSchema extends ListingOrganizationsResponse{
  isLoading: boolean
  limit: number
  offset: number
  canPaginationMore: boolean
  scrollPostion: number
}

const initialState: ListingOrganizationSchema = {
  items: [],
  total: 0,
  isLoading: false,
  limit: DEFAULT_VALUE_LIMIT,
  offset: INITIAL_VALUE_OFFSET,
  canPaginationMore: false,
  scrollPostion: 0
}

export const listingOrganizationSlice = createSlice({
  name: 'listing-organization',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchInitialListingOrganizations.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchInitialListingOrganizations.fulfilled, (state, action: PayloadAction<ListingOrganizationsResponse>) => {
            const data = action.payload

            state.isLoading = false
            state.items = data.items
            state.total = data.total
            state.offset = INITIAL_VALUE_OFFSET + data.items?.length
            state.canPaginationMore = data?.total > data.items?.length
        })
  }
})


export const listingOrganizationReducer = listingOrganizationSlice.reducer