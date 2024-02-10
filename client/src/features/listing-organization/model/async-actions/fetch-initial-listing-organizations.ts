import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {ListingOrganizationSchema} from '../slices/listing-organizations-slice'


import {
    INITIAL_VALUE_OFFSET_LISTING_ORGANIZATION,
    DEFAULT_VALUE_LIMIT_LISTING_ORGANIZATION
} from '../../constans'


export const fetchInitialListingOrganizations = createAsyncThunk<ListingOrganizationSchema, void, ThunkApiConfig>(
    'listing-organizations/fetchInitialListingOrganizations',
    async (_, thunkAPI) => {
        const { extra} = thunkAPI

        try {
            const response = await extra.api.get('/api/organization', {
                params: {
                    limit: DEFAULT_VALUE_LIMIT_LISTING_ORGANIZATION,
                    offset: INITIAL_VALUE_OFFSET_LISTING_ORGANIZATION
                }
            })
            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
