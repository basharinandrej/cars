import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import { fetchInitialListingOrganizations } from './fetch-initial-listing-organizations'

export const deleteBanOrganization = createAsyncThunk<void, number, ThunkApiConfig>(
    'delete-ban-organization/deleteBanOrganization',
    async (organizationId, thunkAPI) => {
        try {
            const { extra, dispatch} = thunkAPI
      
            await extra.api.patch('/api/organization', {
                id:organizationId,
                ban: "Null"
            })

            dispatch(fetchInitialListingOrganizations(true))
            extra.notificationApi.success({
                message: `Организация успешно разбанена`,
            })
        } catch (error) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при снятии бана с организации',
                description: errorMessage
            })
            throw errorMessage     
        }
    }
)