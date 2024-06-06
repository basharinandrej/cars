import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {ListingOrganizationSchema} from '../slices/listing-organizations-slice'
import {
    getOffsetListingOgranizations,
    getStatusFilterListingOrganization,
    getLimitListingOgranizations
} from '../selectors'
import {ParamsFetchListingOrganization} from '../interfaces'

import {Bans, addQueryParams} from '@shared'

export const fetchListingOrganizationNextPart = createAsyncThunk<ListingOrganizationSchema, boolean|void, ThunkApiConfig>(
    'listing-organization/fetchListingOrganizationNextPart',
    async (isCabinet, thunkAPI) => {
        const {getState, extra} = thunkAPI
        const state = getState()

        const limit = getLimitListingOgranizations(state)
        const offset = getOffsetListingOgranizations(state)
        const status = getStatusFilterListingOrganization(state)

        const params: ParamsFetchListingOrganization = {
            limit,
            offset,
            status,
            ban: isCabinet ? null : Bans.Null
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
