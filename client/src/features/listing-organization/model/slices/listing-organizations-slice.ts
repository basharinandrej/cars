import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ListingOrganizationsResponse} from '../../interfaces'

import {fetchInitialListingOrganizations} from '../async-actions/fetch-initial-listing-organizations'
import {fetchListingOrganizationNextPart} from '../async-actions/fetch-listing-organization-next-part'

import {
  DEFAULT_VALUE_LIMIT_LISTING_ORGANIZATION, 
  INITIAL_VALUE_OFFSET_LISTING_ORGANIZATION
} from '../../constans'

import {calcOffset} from '@shared'

export interface ListingOrganizationSchema extends ListingOrganizationsResponse {
  isLoading: boolean
  canPaginationMore: boolean
  scrollPostion: number
}

const initialState: ListingOrganizationSchema = {
  items: [],
  total: 0,
  isLoading: false,
  limit: DEFAULT_VALUE_LIMIT_LISTING_ORGANIZATION,
  offset: INITIAL_VALUE_OFFSET_LISTING_ORGANIZATION,
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
            state.items = data?.items
            state.total = data?.total
            state.offset = INITIAL_VALUE_OFFSET_LISTING_ORGANIZATION + data?.items?.length
            state.canPaginationMore = data?.total > data?.items?.length
        })


        .addCase(fetchListingOrganizationNextPart.pending, (state) => {
          state.isLoading = true
        })
        .addCase(fetchListingOrganizationNextPart.fulfilled, (state, action: PayloadAction<ListingOrganizationsResponse>) => {
          const data = action.payload

          state.isLoading = false
          state.total = data.total
          state.items = state.items.concat(data.items)
          state.offset = calcOffset(state)
          state.canPaginationMore = data.total > state.items?.length
        })
  }
})


export const listingOrganizationReducer = listingOrganizationSlice.reducer