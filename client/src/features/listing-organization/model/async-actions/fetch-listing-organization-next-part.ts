import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {ListingOrganizationSchema} from '../slices/listing-organizations-slice'
import {getOffsetListingOgranizations, getLimitListingOgranizations} from '../selectors'
import {ParamsFetchListingOrganization} from '../interfaces'


export const fetchListingOrganizationNextPart = createAsyncThunk<ListingOrganizationSchema, void, ThunkApiConfig>(
    'listing-organization/fetchListingOrganizationNextPart',
    async (_, thunkAPI) => {
        const {getState, extra} = thunkAPI
        const state = getState()

        const limit = getLimitListingOgranizations(state)
        const offset = getOffsetListingOgranizations(state)

        const params: ParamsFetchListingOrganization = {
            limit,
            offset
        }

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
