import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {ListingOrganizationSchema} from '../slices/listing-organizations-slice'

import {getStatusFilterListingOrganization} from '../selectors'
import {ParamsFetchListingOrganization} from '../interfaces'

import {
    INITIAL_VALUE_OFFSET_LISTING_ORGANIZATION,
    DEFAULT_VALUE_LIMIT_LISTING_ORGANIZATION
} from '../../constans'

import {addQueryParams} from '@shared'

export const fetchInitialListingOrganizations = createAsyncThunk<ListingOrganizationSchema, void, ThunkApiConfig>(
    'listing-organizations/fetchInitialListingOrganizations',
    async (_, thunkAPI) => {
        const {getState, extra} = thunkAPI
        const state = getState()

        const status = getStatusFilterListingOrganization(state)

        const params: ParamsFetchListingOrganization = {
            limit: DEFAULT_VALUE_LIMIT_LISTING_ORGANIZATION, 
            offset: INITIAL_VALUE_OFFSET_LISTING_ORGANIZATION,
            status
        }

        addQueryParams('statusOrganization', params.status)


        try {
            const response = await extra.api.get('/api/organization', {
                params
            })
            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
