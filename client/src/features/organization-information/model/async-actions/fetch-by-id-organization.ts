import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {OrganizationInformationResponse} from '../../interfaces'

export const fetchByIdOrganization = createAsyncThunk<OrganizationInformationResponse, number, ThunkApiConfig>(
    'organization-by-id/fetchByIdOrganization',
    async (id, thunkAPI) => {
        try {
            const { extra} = thunkAPI

            const response = await extra.api.get('/api/organization/getById', {
                params: {
                    id
                }
            })

            return response.data

        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
